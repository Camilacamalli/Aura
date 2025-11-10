// components/SpotifyPlayer.jsx (Conceptual Example)
import React, { useState, useEffect } from 'react';
import Script from 'next/script';

//-----types starts here 
// @types/spotify.d.ts

// This extends the global Window interface to include the Spotify SDK's entry point
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: ISpotifyPlayerOptions) => ISpotifyPlayer;
    };
  }
}

// Options for creating a new Spotify Player instance
export interface ISpotifyPlayerOptions {
  name: string;
  getOAuthToken: (cb: (token: string) => void) => void;
  volume?: number;
}

// The main Spotify Player object with its methods
export interface ISpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: <T extends keyof ISpotifyPlayerListener>(event: T, cb: ISpotifyPlayerListener[T]) => boolean;
  removeListener: (event: keyof ISpotifyPlayerListener) => boolean;
  getCurrentState: () => Promise<Spotify.PlaybackState | null>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  togglePlay: () => Promise<void>;
  // Add other methods as needed
}

// Defines the events the player can listen to
export interface ISpotifyPlayerListener {
  ready: (payload: ISpotifyReadyPayload) => void;
  not_ready: (payload: ISpotifyReadyPayload) => void;
  player_state_changed: (state: Spotify.PlaybackState) => void;
  // Add other events as needed (e.g., 'initialization_error', 'authentication_error')
}

// The payload for the 'ready' and 'not_ready' events
export interface ISpotifyReadyPayload {
  device_id: string;
}

// You might need to add more specific types from the Spotify API reference
// For example, the full PlaybackState object
declare namespace Spotify {
  interface PlaybackState {
    // A simplified version, add more properties as needed
    track_window: {
      current_track: {
        uri: string;
        name: string;
      };
    };
    paused: boolean;
  }
}
//----- finish types here 

// component starts here
// Define the props the component will accept
interface SpotifyPlayerProps {
  // The user's OAuth token. Null if not logged in.
  accessToken: string | null;
  // The URI of the track to play. Null if no track is selected.
  trackUriToPlay: string | null;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ accessToken, trackUriToPlay }) => {
  // State to hold the Spotify Player instance
  const [player, setPlayer] = useState<ISpotifyPlayer | null>(null);
  // State to track if the SDK is loaded and the player is connected
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  // State to store the unique ID of our web player
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    // Do nothing if the user isn't logged in
    if (!accessToken) {
      return;
    }

    // This function is called by the script tag when the SDK is ready
    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Aura Music Web Player',
        getOAuthToken: (callback) => {
          // This function provides the SDK with a fresh access token
          callback(accessToken);
        },
        volume: 0.5,
      });

      // Event listener for when the player is ready to be used
      spotifyPlayer.addListener('ready', (payload) => {
        console.log('Player is ready with Device ID:', payload.device_id);
        setDeviceId(payload.device_id);
        setIsPlayerReady(true);
      });

      // Event listener for when the player goes offline
      spotifyPlayer.addListener('not_ready', (payload) => {
        console.log('Device ID has gone offline:', payload.device_id);
        setDeviceId(null);
        setIsPlayerReady(false);
      });

      // Connect the player to the Spotify service
      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    // Cleanup function to disconnect the player when the component unmounts
    return () => {
      player?.disconnect();
    };
  }, [accessToken]); // This effect re-runs if the access token changes

  // This effect runs when a new track is selected to be played
  useEffect(() => {
    // We need all three of these to play a track
    if (!isPlayerReady || !deviceId || !trackUriToPlay || !accessToken) {
      return;
    }

    // This is the REST API call to start playback on our device
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        uris: [trackUriToPlay], // Pass an array with the URI of the song to play
      }),
    }).catch(error => console.error('Error playing track:', error));

  }, [trackUriToPlay, deviceId, isPlayerReady, accessToken]);

  return (
    <>
      {/* The official Spotify SDK script */}
      <Script src="https://sdk.scdn.co/spotify-player.js" />

      <div className="player-status">
        {!accessToken && <p>Please log in with Spotify to enable the player.</p>}
        {accessToken && !isPlayerReady && <p>Connecting to Spotify Player...</p>}
        {isPlayerReady && <p>Aura Player is connected and ready!</p>}
      </div>
    </>
  );
};

export default SpotifyPlayer;
