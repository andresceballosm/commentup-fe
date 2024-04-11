import { mdiCog } from '@mdi/js';
import React from 'react';
import { ColorKey, TrendType } from '../../interfaces';
import { colorsText } from '../../colors';
import BaseButton from './BaseButton';
import BaseIcon from './BaseIcon';
import CardBox from './CardBox';
import NumberDynamic from './NumberDynamic';
import PillTagTrend from './PillTagTrend';

type Props = {
  number: number;
  numberPrefix?: string;
  numberSuffix?: string;
  icon: string;
  iconColor: ColorKey;
  label: string;
  trendLabel?: string;
  trendType?: TrendType;
  trendColor?: ColorKey;
};

const CardBoxWidget = ({
  icon,
  label,
  number,
  numberSuffix,
  numberPrefix,
  trendType,
  trendLabel,
  trendColor,
  iconColor,
}: Props) => (
  <CardBox>
    {trendLabel && trendType && trendColor && (
      <div className="flex items-center justify-between mb-3">
        <PillTagTrend label={trendLabel} type={trendType} color={trendColor} small />
        <BaseButton icon={mdiCog} color="lightDark" small />
      </div>
    )}
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg leading-tight text-gray-500 dark:text-slate-400">{label}</h3>
        <h1 className="text-3xl leading-tight font-semibold">
          <NumberDynamic value={number} prefix={numberPrefix} suffix={numberSuffix} />
        </h1>
      </div>

      {icon && <BaseIcon path={icon} size="48" w="" h="h-16" className={colorsText[iconColor]} />}
    </div>
  </CardBox>
);

export default CardBoxWidget;
