export const isProductionEnvironment = process.env.NODE_ENV === 'production';

export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

export const EIGEN_LAYER_AVS_FORM_URL = "https://share.hsforms.com/1BksFoaPjSk2l3pQ5J4EVCAein6l?referral_source=avs-builder-app";
