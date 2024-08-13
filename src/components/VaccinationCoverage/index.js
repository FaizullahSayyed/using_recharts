import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {data} = props

  const DataFormatter = number => number * 1000

  return (
    <div className="chart-container">
      <h1 className="chart-heading">Vaccination Coverage</h1>
      {/* <ResponsiveContainer width={100} height={300}> */}
      <BarChart data={data[0]} margin={{top: 10}} width={1000} height={300}>
        <XAxis dataKey="vaccineDate" />
        <YAxis tickFormatter={DataFormatter} />
        <Legend wrapperStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default VaccinationCoverage
