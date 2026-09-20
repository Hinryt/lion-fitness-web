export interface PaymentGateway {
  createCheckout(memberId: string, planId: string): Promise<{ url: string; demo: boolean }>;
}

export interface MessagingGateway {
  sendMessage(destination: string, message: string): Promise<{ delivered: boolean; demo: boolean }>;
}

export interface AccessControlGateway {
  issueCredential(memberId: string): Promise<{ credential: string; demo: boolean }>;
}

export const demoPaymentGateway: PaymentGateway = {
  async createCheckout() {
    return { url: "/mi-cuenta/pagos?estado=demo", demo: true };
  },
};

export const demoMessagingGateway: MessagingGateway = {
  async sendMessage() {
    return { delivered: false, demo: true };
  },
};

export const demoAccessControlGateway: AccessControlGateway = {
  async issueCredential(memberId) {
    return { credential: `DEMO-${memberId}`, demo: true };
  },
};

