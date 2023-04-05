// LandTypes = Construction | Infrastructure | Start | Jail | Parking | Chance
export default class Land {
  constructor(position, description, content) {
    this.content = content;
    this.position = position;
    this.description = description;
  }
}

export class ConstructionLand extends Land {
  constructor(properties, price, owner) {
    super();
    this.price = price;
    this.owner = owner;
    this.properties = properties;
    this.getCount();
    this.landType = "CONSTRUCTIONLAND";
  }
  getCount() {
    let houses = 0;
    let hotels = 0;

    if (this.buildings.length > 0) {
      this.buildings.forEach((building) => {
        switch (building.type) {
          case "HOUSE":
            return houses++;
          case "HOTEL":
            return hotels++;
          default:
            return;
        }
      });
      this.houseCount = houses;
      this.hotelCount = hotels;
    }
  }
  getRent() {
    if (this.buildings.length > 0) {
      this.buildings.forEach(({ cost, ratio }) => {
        const totalCost = (this.price * cost) / ratio;
        const totalHotelCost = totalCost * this.hotelCount;
        const totalHouseCost = totalCost * this.houseCount;
        return totalHotelCost + totalHotelCost;
      });
    }
  }
  changeOwner(newOwner) {
    this.owner = newOwner;
  }
}

export class InfrastructureLand extends Land {
  constructor(properties, price, owner) {
    super();
    this.price = price;
    this.owner = owner;
    this.properties = properties;
    this.landType = "INFRASTRUCTURE";
  }
  changeOwner(newOwner) {
    this.owner = newOwner;
  }
  getRent() {
    return this.price;
  }
}

export class StartLand extends Land {
  constructor(reward) {
    super();
    this.reward = reward;
    this.landType = "INFRASTRUCTURE";
  }
}

export class JailLand extends Land {
  constructor(stops) {
    super();
    this.stops = stops;
    this.landType = "JAIL";
  }
}

export class ParkingLand extends Land {
  constructor() {
    super();
    this.landType = "PARKING";
  }
}

export class ChanceLand extends Land {
  constructor() {
    super();
    this.landType = "CHANCE";
  }
}
