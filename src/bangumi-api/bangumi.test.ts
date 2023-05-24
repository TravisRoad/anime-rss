import { describe } from "node:test";
import bangumi, { Bangumi } from "./bangumi";
import { calendar } from "./type";

describe("bangumi", () => {
  it("should return calender type promise", async () => {
    const data: calendar = await bangumi.getCalendar();
    expect(data.length).toBeCloseTo(7);
    expect(data[0].weekday.id).toBeCloseTo(1);
  });
});
