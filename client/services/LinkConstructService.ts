export default class LinkConstructService {
  static constructPostLink(postId: string) {
    return process.env.NEXT_PUBLIC_CLIENT_URL + "posts/" + postId;
  }
}
