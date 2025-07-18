export const environment = {
  production: true,
  apiUrl:
    process.env['NG_APP_BASE_URL'] ||
    'http://gtp2-be-testing-alb-114080375.eu-central-1.elb.amazonaws.com',
};
