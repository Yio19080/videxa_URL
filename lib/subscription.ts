// lib/subscription.ts

export type UserPlan = "FREE" | "VIP";

export interface UserPermissions {
  canWatch: boolean;
  canInteract: boolean;
  canUploadShorts: boolean;
  canDownload: boolean;
  canUseTemplates: boolean;
  canAccessExclusive: boolean;
  hasAds: boolean;
}

export function getPermissions(plan: UserPlan): UserPermissions {
  if (plan === "VIP") {
    return {
      canWatch: true,
      canInteract: true,
      canUploadShorts: true,
      canDownload: true,
      canUseTemplates: true,
      canAccessExclusive: true,
      hasAds: false,
    };
  }
  return {
    canWatch: true,
    canInteract: true,
    canUploadShorts: true,
    canDownload: false,
    canUseTemplates: false,
    canAccessExclusive: false,
    hasAds: true,
  };
}

export const VIP_PAYMENT_URL = "https://buy.stripe.com/your_live_checkout_link";

