import {ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {data} = props
  //   console.log(data)

  return (
    <div className="chart-container">
      <h1 className="chart-heading">Vaccination By Gender</h1>
      <ResponsiveContainer width={1000} height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={data}
            startAngle={0}
            endAngle={180}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#fecba6" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Others" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
