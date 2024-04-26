import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function PieChart({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 500;
        const height = 500;
        const radius = Math.min(width, height) / 2;

        const pie = d3.pie()
            .value((d) => d.value)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const arcs = pie(data);

        svg.selectAll('.arc')
            .data(arcs)
            .enter()
            .append('path')
            .attr('class', 'arc')
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemeCategory10[i]);

        svg.selectAll('.arc')
            .on('mouseover', function () {
                d3.select(this).attr('opacity', 0.7);
            })
            .on('mouseout', function () {
                d3.select(this).attr('opacity', 1);
            });

        svg.selectAll('.arc')
            .data(arcs)
            .enter()
            .append('text')
            .attr('transform', (d) => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .text((d) => d.year);

        return () => {
            svg.selectAll('*').remove(); // Cleanup SVG
        };
    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
}

export default PieChart;
