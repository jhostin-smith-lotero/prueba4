
export type PushProviders = {
  web?: { endpoint: string; p256dh: string; auth: string };
  fcm?: { token: string };
};
