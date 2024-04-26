import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'




function DemoChart() {
    const [data, setData] = useState([
        {
            "year": 2014,
            "value": 10
        },
        {
            "year": 2015,
            "value": 30
        },
        {
            "year": 2016,
            "value": 50
        },
        {
            "year": 2017,
            "value": 70
        },
        {
            "year": 2018,
            "value": 30
        },
        {
            "year": 2019,
            "value": 60
        },
        {
            "year": 2020,
            "value": 70
        }
    ]);
    const svgRef = useRef();
    const [element, setElement] = useState(null)
    const barRef = useRef();
    const ractWidth = 50;
    const ractHeight = 100;
    useEffect(() => {
        console.log("🚀 ~ formattedData ~ formattedData:", data)

        // setData(formattedData);
        // const svg = d3.select(svgRef.current);
        // svg.selectAll('circle').data(data).join(
        //     enter => {
        //         setElement(enter)
        //         enter.append('circle').attr('class', 'enter').attr("r", val => val).attr("fill", "white").attr("cx", val => val * 2)
        //             .attr("cy", val => val * 2).attr('stroke', 'red')
        //     },
        //     update => update.attr('class', 'update'),
        //     exit => exit.remove()
        // )
        const width = 500;
        const height = 500;

        const barChart = d3.select(barRef.current);

        const xScale = d3.scaleBand()
            .domain(data.map((item) => item.year))
            .range([0, width])
            .padding(0.4);

        const xAxis = d3.axisBottom(xScale).ticks(data.length);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .range([height, 0]).nice();

        const yAxis = d3.axisLeft(yScale).ticks(data.length).tickSize(-width);

        barChart.append("g")
            .call(xAxis)
            .attr("transform", `translate(0,${height})`);

        barChart.append("g")
            .call(yAxis)

        barChart.selectAll('rect')
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('x', (d) => xScale(d.year))
            .attr('y', height)
            .attr("stroke", "yellow")
            .attr("fill", "green").transition() // Apply transition for animation
            .duration(1000) // Duration of animation in milliseconds
            .attr('height', (d) => height - yScale(d.value))
            .attr('y', (d) => yScale(d.value));

        barChart.selectAll('.bar').data(data)

        barChart.select(".x-axis")
            .call(xAxis)
            .attr("transform", `translate(0,${height})`);

        barChart.select(".y-axis")
            .call(yAxis);

        console.log("data", data)
        return () => {
            barChart.selectAll('rect').remove();
            barChart.selectAll('g').remove();
        };
    }, [data])
    // console.log("🚀 ~ DemoChart ~ element:", element)             
    return (
        <>
            {/* <svg ref={svgRef}></svg> */}
            {/* // update the chart */}
            <svg ref={barRef} width={500} height={500} style={{ display: 'flex', justifyContent: 'center', alignItems: "center", overflow: 'visible' }}>

            </svg>
            <button style={{ marginTop: "50px" }} onClick={() => setData(data.map(val => ({
                value: Math.floor(Math.random() * 100),
                year: val.year
            })))}>Update the data</button>
        </>
    )
}

export default DemoChart