import docs  from "../_data/docs.json" with { type: "json" };

const apis = docs.nodes[1].namespaceDef.elements;

export default function* () {

  for (const item of apis) {
    yield {
      layout: "layouts/api.vto",
      url: `/apis/${item.kind}/${item.name}-${item.location.byteIndex}/`,  
      ...item,   
    };
  }
}