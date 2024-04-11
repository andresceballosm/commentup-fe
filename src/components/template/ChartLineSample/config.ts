export const chartColors = {
  default: {
    primary: '#00D1B2',
    info: '#209CEE',
    danger: '#FF3860',
  },
};

const randomChartData = (n: number) => {
  const data = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200));
  }

  return data;
};

const datasetObject = (color: string, points: number) => ({
  fill: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  borderColor: chartColors.default[color],
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0.0,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pointBackgroundColor: chartColors.default[color],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pointBorderColor: 'rgba(255,255,255,0)',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pointHoverBackgroundColor: chartColors.default[color],
  pointBorderWidth: 20,
  pointHoverRadius: 4,
  pointHoverBorderWidth: 15,
  pointRadius: 4,
  data: randomChartData(points),
  tension: 0.5,
  cubicInterpolationMode: 'default',
});

export const sampleChartData = (points = 9) => {
  const labels = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= points; i++) {
    labels.push(`0${i}`);
  }

  return {
    labels,
    datasets: [datasetObject('primary', points), datasetObject('info', points), datasetObject('danger', points)],
  };
};
