let geocluster = require('geocluster');
let fs = require('fs');

export async function cluster(mapDataPoint) {
    let text = fs.readFileSync('./exported/data1-0.json');

    const data = mapDataPoint['data'];
    let coordinates = [];
    let test = [];
    let data_c = [];

    for (let i = 0; i < data?.length; i++) {
        let arr = data[i]['startLoc'].split(',');
        coordinates.push([Number(arr[1]), Number(arr[0])]);
    }
    const bias = 0.05;
    let result = geocluster(coordinates, bias);

    let len = [];

    for (let i = 0; i < result.length; i++) {
        len.push(result[i].elements.length);
    }

    let len1 = [...len];
    let topValues = len.sort((a, b) => b - a).slice(0, 5);
    let idxs = [];
    for (let i = 0; i < topValues.length; i++) {
        let idx = len1.indexOf(topValues[i]);
        idxs.push(idx);
    }

    let final_result = [];
    for (let i = 0; i < topValues.length; i++) {
        final_result.push(result[idxs[i]]);
    }


    for (let i = 0; i < data.length; i++) {
        let sLoc = data[i]['startLoc'].split(',');
        let eLoc = data[i]['endLoc'].split(',');
        data_c.push([
            [Number(sLoc[1]), Number(sLoc[0])],
            [Number(eLoc[1]), Number(eLoc[0])],
        ]);
    }

    let cluster1_s = [];
    for (let i = 0; i < final_result[0].elements.length; i++) {
        cluster1_s.push(final_result[0].elements[i]);
    }

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    let cluster1_e = [];
    cluster1_s.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][0], element)) {
                cluster1_e.push(data_c[i][1]);
            }
        }
    });

    let cluster1_dest_cluster = geocluster(cluster1_e, 0.5);

    let len_d = [];
    for (let i = 0; i < cluster1_dest_cluster.length; i++) {
        len_d.push(cluster1_dest_cluster[i].elements.length);
    }

    let len_d_1 = [...len_d];
    var topValues_d = len_d.sort((a, b) => b - a).slice(0, 5);

    let idxs_d = [];
    for (let i = 0; i < topValues_d.length; i++) {
        let idx_d = len_d_1.indexOf(topValues_d[i]);
        idxs_d.push(idx_d);
    }
    let final_result_d = [];
    for (let i = 0; i < topValues_d.length; i++) {
        final_result_d.push(cluster1_dest_cluster[idxs_d[i]]);
    }
    let cluster1_d = [];
    for (let i = 0; i < final_result_d[0]?.elements.length; i++) {
        cluster1_d.push(final_result_d[0].elements[i]);
    }

    let c1_ultimate_data = [];
    cluster1_d.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][1], element)) {
                c1_ultimate_data.push(data_c[i]);
            }
        }
    });
    return c1_ultimate_data;
}
