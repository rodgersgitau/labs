export interface IUser {
  name: string;
  score?: number;
  avatar?: string;
}

export class User {
  private name: IUser["name"];
  private avatar?: IUser["avatar"];
  private score?: IUser["score"] = 0;

  constructor({ name, score, avatar }: IUser) {
    if (!this.isAvailable(name)) {
      this.name = name;
      this.score = score;
      this.avatar = avatar;
    } else {
      throw new Error("User already exists!!");
    }
  }

  getInfo() {
    try {
      const cUser = {
        name: this.name,
        score: this.score,
        avatar: this.avatar,
      };
      return cUser;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  private isAvailable(name: string) {
    const array = ["Optimal", "HighTek"];
    return array.includes(name);
  }
}
