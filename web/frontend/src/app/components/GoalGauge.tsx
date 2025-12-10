import { Gauge, gaugeClasses } from '@mui/x-charts';
import { useContext } from 'react';
import { AnalyticsContext } from '@/app/util/util';

export default function GoalGauge() {
    const { totalTips } = useContext(AnalyticsContext);

    return (
        <Gauge
            value={totalTips}
            margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
            sx={() => ({
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 24,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#DEF186',
                },
                // [`& .${gaugeClasses.referenceArc}`]: {
                //     fill: theme.palette.text.disabled,
                // },
            })}
            text={({ value }) => `${value}%`}
            innerRadius="60%"
            outerRadius="85%"
        />
    );
}
