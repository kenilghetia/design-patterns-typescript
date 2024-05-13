// Subject interface representing the news agency
interface NewsAgency {
  attach(subscriber: Subscriber): void;
  detach(subscriber: Subscriber): void;
  notifySubscribers(): void;
  addNews(news: string): void;
}

// Concrete subject representing the news agency
class ConcreteNewsAgency implements NewsAgency {
  private subscribers: Subscriber[] = [];
  private news: string = "";

  attach(subscriber: Subscriber): void {
    console.log("NewsAgency: Subscriber attached.");
    this.subscribers.push(subscriber);
  }

  detach(subscriber: Subscriber): void {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      console.log("NewsAgency: Subscriber detached.");
      this.subscribers.splice(index, 1);
    }
  }

  notifySubscribers(): void {
    console.log("NewsAgency: Notifying subscribers.");
    for (const subscriber of this.subscribers) {
      subscriber.update(this.news);
    }
  }

  addNews(news: string): void {
    console.log("NewsAgency: News added.");
    this.news = news;
    this.notifySubscribers();
  }
}

// Observer interface representing the subscribers
interface Subscriber {
  update(news: string): void;
}

// Concrete observers representing the subscribers
class SubscriberA implements Subscriber {
  update(news: string): void {
    console.log(`SubscriberA: Received news - "${news}"`);
  }
}

class SubscriberB implements Subscriber {
  update(news: string): void {
    console.log(`SubscriberB: Received news - "${news}"`);
  }
}

// Client code
const newsAgency = new ConcreteNewsAgency();
const subscriber1 = new SubscriberA();
const subscriber2 = new SubscriberB();

newsAgency.attach(subscriber1);
newsAgency.attach(subscriber2);

newsAgency.addNews("Breaking news: COVID-19 vaccine approved!");
newsAgency.addNews("Weather forecast: Sunny with a chance of rain.");

newsAgency.detach(subscriber2);

newsAgency.addNews("Traffic update: Heavy traffic on the highways.");
