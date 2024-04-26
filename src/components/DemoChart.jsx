import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

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
        },
        {
            "year": 2021,
            "value": 70
        },
        {
            "year": 2022,
            "value": 70
        },
    ]);
    const svgRef = useRef();
    const [element, setElement] = useState(null)
    const barRef = useRef();
    const ractWidth = 50;
    const ractHeight = 100;
    useEffect(() => {
        const width = document.querySelector("body").clientWidth;
        const height = 500;
        const margin = { top: 20, right: 30, bottom: 55, left: 70 }

        const barChart = d3.select(barRef.current).attr("viewBox", [0, 0, width, height]);

        const xScale = d3.scaleBand()
            .domain(data.map((item) => item.year))
            .range([0, width])
            .padding(0.3);

        const xAxis = d3.axisBottom(xScale).ticks(data.length);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d.value)])
            .range([height, 0]).nice();

        const yAxis = d3.axisLeft(yScale).ticks(data.length).tickSize(-width);

        barChart.append("g")
            .call(xAxis).attr("font-size", "20px")
            .attr("transform", `translate(0,${height})`)
            .classed("x-axis", true);

        barChart.append("g")
            .call(yAxis).attr("font-size", "20px")
            .classed("y-axis", true);

        const gradient = barChart.append("defs").append("linearGradient")
            .attr("id", "barGradient")
            .attr("x1", "0%").attr("y1", "0%")
            .attr("x2", "0%").attr("y2", "100%");
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "pink");
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "white");

        barChart.selectAll('.bar-group')
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar-group")
            .attr("transform", d => `translate(${xScale(d.year)}, 0)`)
            .append("rect")
            .attr("class", "bar")
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('x', 0)
            .attr('y', height)
            .attr("stroke", "yellow")
            .attr("fill", "url(#barGradient)") // Apply gradient fill
            .attr("ry", 8) // border-radius for top-left and top-right corners
            .transition() // Apply transition for animation
            .duration(1000) // Duration of animation in milliseconds
            .attr('height', (d) => height - yScale(d.value))
            .attr('y', (d) => yScale(d.value));

        barChart.selectAll('.bar').data(data)

        barChart.select(".x-axis")
            .call(xAxis)
            .attr("transform", `translate(0,${height})`);

        barChart.select(".y-axis")
            .call(yAxis);

        return () => {
            barChart.selectAll('.bar-group').remove();
            barChart.selectAll('g').remove();
        };
    }, [data])

    return (
        <>
            <svg ref={barRef} width={500} height={500} style={{ display: 'flex', justifyContent: 'center', alignItems: "center", overflow: 'visible' }}></svg>
            <button style={{ marginTop: "50px" }} onClick={() => setData(data.map(val => ({
                value: Math.floor(Math.random() * 100),
                year: val.year
            })))}>Update the data</button>
        </>
    )
}

export default DemoChart;
