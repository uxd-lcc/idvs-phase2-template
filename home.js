// This script generates HTML nodes for the home page of the project
let info, head = d3.select('head');
d3.text('info.yml').then(yml=>{
    info = jsyaml.load(yml);

    const metaTags = head.selectAll('meta').data(info.meta).enter().append('meta')
        .attr('property',d=>d.property)
        .attr('content',d=>d.content)
})