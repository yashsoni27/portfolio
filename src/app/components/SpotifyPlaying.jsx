import { NowPlaying, Providers } from "@BolajiOlajide/now-playing";

export async function SpotifyPlaying() {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
  const np = new NowPlaying(Providers.SPOTIFY, {
    useCache: true, // (optional) default is true
    cacheDuration: 30000, // (optional) in milliseconds
    streamerArgs: {
      clientId: client_id,
      clientSecret: client_secret,
      refreshToken: refresh_token,
    },
  });
  const Playing = await np.fetchCurrentlyPlayingOrLastPlayed();
  return Playing;
}
