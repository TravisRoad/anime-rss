import { calendar } from "./type";

class Bangumi {
  private static instance: Bangumi;

  private constructor() {}

  public static getInstance(): Bangumi {
    if (!Bangumi.instance) {
      Bangumi.instance = new Bangumi();
    }
    return Bangumi.instance;
  }

  private base: string = "https://api.bgm.tv";

  public async getCalendar(): Promise<calendar> {
    const rsp = await fetch(`${this.base}/calendar`, {
      next: { revalidate: 3600 }, // revalidate this data every hour
    });
    const data = await rsp.json();
    return data;
  }
}

const bangumi: Bangumi = Bangumi.getInstance();

export default bangumi;
export { Bangumi };
