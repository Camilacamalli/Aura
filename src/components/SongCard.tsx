import Image from 'next/image';

type Song = {
  id: number,
  title: string,
  artist: string,
  album: string,
  albumArt: string,
  previewUrl: string
}

export default function SongCard({ song }: { song: Song }) {
  return (
    <article>
      <Image
        src={song.albumArt}
        alt={`Album art for ${song.title}`}
        width={150}
        height={150}
      />
      <div>
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
      </div>
    </article>
  )

}
