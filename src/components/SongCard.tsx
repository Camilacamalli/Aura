import Image from 'next/image';

export default function SongCard({ song }) {
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
