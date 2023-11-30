import { type BarDatum, type LegendLabelDatum } from '@nivo/bar'
import dynamic from 'next/dynamic'

import { BarSkeleton } from '@/ui'

export type BarChartData = BarDatum & {
  /* custom data need to start with _ */
  _percent: BarDatum
  _total: number
}

type BarChartProps = {
  data?: Partial<BarChartData>
  loading: true
} | {
  data: BarChartData
  loading?: false
}

type LegendLabelDatumOverride<T extends BarChartData> = LegendLabelDatum<T> & { id: Exclude<keyof T, `_${string}`> }

/** A workaround for ERR_REQUIRE_ESM ¯\_(ツ)_/¯ */
const ResponsiveBar = dynamic(() => import('@nivo/bar').then(m => m.ResponsiveBar), {
  loading: () => <BarSkeleton className='_h-[70px] w-[600px]' rows={3} legend={3} />,
  ssr: false,
})

export const BarChart: React.FC<BarChartProps> = ({ data, loading }) => {
  return loading
    ? <BarSkeleton className='_h-[70px] w-[600px]' rows={3} legend={3} />
    : (
      <div className='h-[76px] w-[600px] m-2'>
        <ResponsiveBar
          data={[data] as unknown as BarDatum[]}
          keys={Object.keys(data).filter(key => !key.startsWith('_'))}
          legendLabel={((d: LegendLabelDatumOverride<BarChartData>) => (
            <>
              <tspan x="20" dy="-10px">{`${d.value} ${d.id}`}</tspan>
              <tspan x="20" dy="20px">{`${(d.data!)._percent[d.id]}%`}</tspan>
            </>
          )) as unknown as () => string}
          margin={{ top: 8, right: 8, bottom: 54, left: 8 }}
          padding={0}
          layout="horizontal"
          colors={colors}
          borderColor="black"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={null}
          enableGridY={false}
          enableLabel={false}
          tooltipLabel={d => `${d.id}`}
          legends={[{
            dataFrom: 'keys',
            anchor: 'bottom',
            direction: 'row',
            translateY: 45,
            itemsSpacing: 10,
            itemWidth: 80,
            itemHeight: 40,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderWidth: 2,
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }]}
        />
      </div>
    )
}

export const colors = ['#2ca02c', '#ff7f0e', '#ccd5e0', '#1f77b4', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#bcbd22', '#17becf', '#7f7f7f']
