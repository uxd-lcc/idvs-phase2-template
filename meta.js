let head = d3.select('head');
d3.text('info.yml').then(info=>{
    info = jsyaml.load(info);

    const metaTags = head.selectAll('meta').data(info.meta).enter().append('meta')
        .attr('property',d=>d.property)
        .attr('content',d=>d.content)
})