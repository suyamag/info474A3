(function (d3) {
    'use strict';
    console.log("anime");
    const svg = d3.select('svg');
  
    const width = +svg.attr('width');
    const height = +svg.attr('height');
  
    const render = data => {
      const title = 'Anime: Num Of Episodes vs. Avg Rating';
      
      const xValue = d => d.episodes;
      const xAxisLabel = 'Num Of Episodes';
      
      const yValue = d => d.rating;
      const circleRadius = 3;
      const yAxisLabel = 'Avg Rating';
      
      const margin = { top: 60, right: 40, bottom: 88, left: 150 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
      
      const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])
        .nice();
      
      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
      
      const xAxis = d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15);
      
      const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10);
      
      const yAxisG = g.append('g').call(yAxis);
      yAxisG.selectAll('.domain').remove();
      
      yAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', -93)
          .attr('x', -innerHeight / 2)
          .attr('fill', 'black')
          .attr('transform', `rotate(-90)`)
          .attr('text-anchor', 'middle')
          .text(yAxisLabel);
      
      const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      
      xAxisG.select('.domain').remove();
      
      xAxisG.append('text')
          .attr('class', 'axis-label')
          .attr('y', 75)
          .attr('x', innerWidth / 2)
          .attr('fill', 'black')
          .text(xAxisLabel);
      
      g.selectAll('circle').data(data)
        .enter().append('circle')
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)))
          .attr('r', circleRadius);
      
      g.append('text')
          .attr('class', 'title')
          .attr('y', -10)
          .text(title);
    };
  
    d3.csv('anime_cleaned.csv')
      .then(data => {
        data.forEach(d => {
            d.anime_id = +d.anime_id;
            d.name = +d.name;
            d.genre = +d.genre;
            d.type = +d.type;
            d.episodes = +d.episodes;
            d.rating = +d.rating;
            d.members = +d.members;
        });
        render(data);
      });
  
  }(d3));
  