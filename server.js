import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 8787);
const anthropicKey = process.env.ANTHROPIC_API_KEY;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");

app.use(express.json({ limit: "1mb" }));

const fallbackCopy = {
  serious: {
    hooks: [
      `Every day, somebody in Ghana is asking, "How do I move money without stress?" If that sounds like you, listen carefully.`,
      `When money has to move, delays and confusion can block real plans. That is why Pay Up is worth your attention.`,
      `You work hard for your money, so sending, shopping, and managing it should feel simple and secure.`,
      `If you have family abroad, shop online, or handle dollars for business, you already know the small money problems can slow you down.`,
      `In today's Ghana, opportunity moves fast. Your money tools should move fast too.`,
      `Whether you are at work, in the market, on campus, or supporting family overseas, money should not become a headache.`,
      `Sometimes the difference between stress and progress is having the right app on your phone.`,
      `If international payments, online shopping, or dollar needs have been worrying you, Pay Up is built for that reality.`,
      `Money matters are serious, and the right tool can help you move with more confidence.`,
      `From Accra to Kumasi, from campus life to business life, people need money solutions that keep up.`,
    ],
    features: [
      `you can send money internationally to the UK, USA, Nigeria, China, India, the UAE, and across Europe, create a virtual card for online shopping, and open a USD account when dollars are part of the plan.`,
      `you can move money abroad, shop online with a virtual card, and manage a USD account from one place.`,
      `you can send support to family overseas, create virtual cards for online payments, and buy gift cards from major companies.`,
      `international transfers, virtual cards, and USD accounts all become easier to manage from your phone.`,
      `you can send money to key countries, create a virtual card when you need to pay online, and buy gift cards without jumping through hoops.`,
      `you can handle international money transfers, create a USD account, and shop online with a virtual card made for the moment.`,
      `you can support people abroad, pay online with a virtual card, and keep dollar plans moving with a USD account.`,
      `you can send money internationally, buy major gift cards, and create virtual cards for everyday online payments.`,
      `you can move money to places like the UK, USA, Nigeria, India, China, the UAE, and Europe while also getting tools for online shopping.`,
      `you can create virtual cards, open USD accounts, and send money internationally without making the process feel heavy.`,
      `you can shop online with a virtual card, send money across borders, and buy gift cards when you need a quick digital option.`,
      `you can manage cross-border payments, online shopping, and dollar needs with a tool made for modern Ghanaian life.`,
    ],
    bridges: [
      `It is a practical way to stay ready when life, business, or family needs you to act quickly.`,
      `That means fewer excuses, fewer delays, and more control in your hands.`,
      `For busy people, that kind of access can make a real difference.`,
      `It gives you confidence when the next payment, purchase, or transfer comes up.`,
      `So instead of waiting and worrying, you can handle what matters and keep moving.`,
      `It is simple enough for daily use and strong enough for serious money plans.`,
    ],
    audiences: [
      `This is for workers building a future, traders moving fast, students paying online, and families staying connected across borders.`,
      `For workers, traders, students, and diaspora families, Pay Up fits the way real people live.`,
      `Whether you are running a shop, managing school payments, or supporting someone abroad, this is for you.`,
      `If your money life crosses borders, websites, or currencies, Pay Up belongs on your phone.`,
      `From the office to the market, from campus to family abroad, Pay Up helps you stay prepared.`,
      `It is for anyone who wants less stress and more confidence when money has to move.`,
    ],
    ctas: [
      `Download Pay Up today and start doing more with your money. Pay Up - simple, smart, and made for your next level.`,
      `Take charge from your phone today. Download Pay Up. Pay Up - move money, shop smarter, and step up financially.`,
      `Do not let old money stress block new opportunities. Get Pay Up today. Pay Up - built for the way you move.`,
      `Make your next transfer, payment, or online purchase easier. Download Pay Up now. Pay Up - your money, moving with purpose.`,
      `Level up how you send, shop, and manage dollars. Download Pay Up today. Pay Up - confidence in your pocket.`,
      `Your money should move with your plans. Get Pay Up today. Pay Up - the smarter way forward.`,
      `Start today with the app built for modern money life. Download Pay Up. Pay Up - do more with every move.`,
    ],
  },
  witty: {
    hooks: [
      `Ei Ghana, have you ever tried to pay online and your card said, "Not today"? Relax, Pay Up has entered the chat.`,
      `You know that moment when your money is ready, but the payment system is doing hide and seek? That one must stop.`,
      `Sometimes online checkout can make you question your whole life. Pay Up is here to reduce the drama.`,
      `You want to send money, buy something online, or handle dollars, then suddenly everything becomes a meeting. Ah, why?`,
      `If your card has ever embarrassed you at checkout, please gather here. Pay Up has good news.`,
      `Money wahala can turn a simple task into a full episode. Pay Up is the shortcut you wish you had earlier.`,
      `One minute you are shopping online, next minute your card is behaving like it needs motivation. Pay Up says enough.`,
      `When family abroad needs help and payment platforms start forming boss, that is not the time for stress.`,
      `Some payment problems are too small to be stealing your peace. Pay Up came to handle those ones.`,
      `If your phone can order food, stream music, and join meetings, it should also help your money move properly.`,
    ],
    features: [
      `you can create virtual cards for online shopping, send money internationally to the UK, USA, Nigeria, China, India, the UAE, and Europe, and open a USD account when dollars join the story.`,
      `you can send money abroad, create a virtual card for checkout, and buy gift cards from major companies without turning it into a whole production.`,
      `you can shop online with virtual cards, manage a USD account, and send money to family or business contacts across key countries.`,
      `you can create virtual cards, buy major gift cards, and move money internationally from one app on your phone.`,
      `you can send money to places like the UK, USA, Nigeria, India, China, the UAE, and Europe, then still handle online shopping with a virtual card.`,
      `you can create a virtual card before checkout disgraces you, open a USD account for dollar plans, and send money internationally when people need you.`,
      `you can buy gift cards, send money abroad, and create virtual cards for online payments that refuse to wait.`,
      `you can move money across borders, shop online with a virtual card, and keep dollar plans neat with a USD account.`,
      `you can sort international transfers, virtual cards, and gift cards without walking around town looking for solutions.`,
      `you can send money internationally, create USD accounts, and get virtual cards for the online purchases calling your name.`,
      `you can support family abroad, pay online, and buy gift cards without making your blood pressure rise.`,
      `you can send, shop, and handle dollar needs from one place, instead of fighting ten different payment battles.`,
    ],
    bridges: [
      `So when the next payment moment comes, you are not there refreshing and sweating.`,
      `That is less long talk, more action, and fewer checkout surprises.`,
      `It keeps things moving before small payment issues become big stories.`,
      `Your phone is already in your hand, so let it do something useful for your money too.`,
      `No unnecessary drama, no plenty back and forth, just a cleaner way to get things done.`,
      `It is the kind of app that makes you wonder why you were suffering before.`,
    ],
    audiences: [
      `Workers, traders, students, family treasurers, diaspora connectors - everybody can find a use for this one.`,
      `If you are working, trading, studying, or always helping family across borders, this app is speaking your language.`,
      `Whether you are in the office, at the shop, on campus, or handling family requests, Pay Up keeps you ready.`,
      `This is for anyone tired of payment gymnastics and "try again later" messages.`,
      `From online shoppers to people sending support abroad, Pay Up helps you move smarter.`,
      `If money movement has ever given you attitude, Pay Up is your new response.`,
    ],
    ctas: [
      `Download Pay Up today. Pay Up - because your money deserves sense.`,
      `Get Pay Up now. Pay Up - small app, big relief.`,
      `Do yourself a favor before the next payment wahala. Download Pay Up today.`,
      `Stop arguing with payments. Download Pay Up now and move smarter.`,
      `Join the people who like peace. Get Pay Up today. Pay Up - money moves without the drama.`,
      `Make your phone useful for your money life. Download Pay Up today.`,
      `When money needs to move, do not overthink it. Open Pay Up and handle it.`,
    ],
  },
};

const countFallbackOptions = (tone) => {
  const copy = fallbackCopy[tone];
  return copy.hooks.length * copy.features.length * copy.bridges.length * copy.audiences.length * copy.ctas.length;
};

const fallbackOptionCounts = {
  serious: countFallbackOptions("serious"),
  witty: countFallbackOptions("witty"),
};

const getFallbackTone = (prompt = "") => {
  if (/light and witty/i.test(prompt)) return "witty";
  return "serious";
};

const getSeed = (prompt = "") => {
  const promptTotal = [...prompt].reduce((total, char) => total + char.charCodeAt(0), 0);
  return promptTotal + Date.now() + Math.floor(Math.random() * 100000);
};

const pick = (items, seed, salt) => items[Math.abs(seed + salt * 7919) % items.length];

const getFallbackScript = (prompt = "") => {
  const tone = getFallbackTone(prompt);
  const copy = fallbackCopy[tone];
  const seed = getSeed(prompt);

  return [
    pick(copy.hooks, seed, 1),
    `With Pay Up, ${pick(copy.features, seed, 2)} ${pick(copy.bridges, seed, 3)}`,
    pick(copy.audiences, seed, 4),
    pick(copy.ctas, seed, 5),
  ].join("\n\n");
};

const sendFallback = (req, res) => {
  const prompt = req.body?.messages?.find((message) => message.role === "user")?.content;
  const text = getFallbackScript(typeof prompt === "string" ? prompt : "");

  res.json({
    id: "local-fallback",
    type: "message",
    role: "assistant",
    model: "local-pay-up-copywriter",
    content: [{ type: "text", text }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 0, output_tokens: 0 },
  });
};

app.post("/api/messages", async (req, res) => {
  if (!anthropicKey) {
    sendFallback(req, res);
    return;
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (error) {
    sendFallback(req, res);
  }
});

app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Pay Up app listening on http://0.0.0.0:${port}`);
  if (!anthropicKey) {
    console.log(
      `ANTHROPIC_API_KEY not set; using local fallback scripts with ${fallbackOptionCounts.serious}+ serious and ${fallbackOptionCounts.witty}+ witty combinations.`,
    );
  }
});
