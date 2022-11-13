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
    let bias = 0.05;
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
    let cluster2_s = [];
    let cluster3_s = [];
    let cluster4_s = [];

    let cluster5_s = [];
    for (let i = 0; i < final_result[0].elements.length; i++) {
        cluster1_s.push(final_result[0].elements[i]);
    }

    
    for (let i = 0; i < final_result[1].elements.length; i++) {
        cluster2_s.push(final_result[1].elements[i]);
    }

    
    for (let i = 0; i < final_result[2].elements.length; i++) {
        cluster3_s.push(final_result[2].elements[i]);
    }

  
    for (let i = 0; i < final_result[3].elements.length; i++) {
        cluster4_s.push(final_result[3].elements[i]);
    }

    for (let i = 0; i < final_result[4].elements.length; i++) {
        cluster5_s.push(final_result[4].elements[i]);
    }

    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    let cluster1_e = [];
    let cluster2_e = [];
    let cluster3_e = [];
    let cluster4_e = [];
    let cluster5_e = [];
    let len_d_5 = [];

    cluster1_s.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][0], element)) {
                cluster1_e.push(data_c[i][1]);
            }
        }
    });

    cluster2_s.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][0], element)) {
                cluster2_e.push(data_c[i][1]);
            }
        }
    });

    cluster3_s.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][0], element)) {
                cluster3_e.push(data_c[i][1]);
            }
        }
    });

    cluster4_s.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][0], element)) {
                cluster4_e.push(data_c[i][1]);
            }
        }
    });

    cluster5_s.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][0], element)) {
                cluster5_e.push(data_c[i][1]);
            }
        }
    });

    let cluster1_dest_cluster_1 = geocluster(cluster1_e, 0.5);
    let cluster1_dest_cluster_2 = geocluster(cluster1_e, 0.5);
    let cluster1_dest_cluster_3 = geocluster(cluster1_e, 0.5);
    let cluster1_dest_cluster_4 = geocluster(cluster1_e, 0.5);
    let cluster1_dest_cluster_5 = geocluster(cluster1_e, 0.5);
    let len_d_1 = [];
    let len_d_2 = [];
    let len_d_3 = [];
    let len_d_4 = [];
    for (let i = 0; i < cluster1_dest_cluster_1.length; i++) {
        len_d_1.push(cluster1_dest_cluster_1[i].elements.length);
    }

    
    for (let i = 0; i < cluster1_dest_cluster_2.length; i++) {
        len_d_2.push(cluster1_dest_cluster_2[i].elements.length);
    }


    for (let i = 0; i < cluster1_dest_cluster_3.length; i++) {
        len_d_3.push(cluster1_dest_cluster_3[i].elements.length);
    }


    for (let i = 0; i < cluster1_dest_cluster_4.length; i++) {
        len_d_4.push(cluster1_dest_cluster_4[i].elements.length);
    }

   
    for (let i = 0; i < cluster1_dest_cluster_5.length; i++) {
        len_d_5.push(cluster1_dest_cluster_5[i].elements.length);
    }

    let len_d_11 = [...len_d_1];
    let len_d_22 = [...len_d_2];
    let len_d_33 = [...len_d_3];
    let len_d_44 = [...len_d_4];
    let len_d_55 = [...len_d_5];

    var topValues_d_1 = len_d_1.sort((a, b) => b - a).slice(0, 5);
    var topValues_d_2 = len_d_2.sort((a, b) => b - a).slice(0, 5);
    var topValues_d_3 = len_d_3.sort((a, b) => b - a).slice(0, 5);
    var topValues_d_4 = len_d_4.sort((a, b) => b - a).slice(0, 5);
    var topValues_d_5 = len_d_5.sort((a, b) => b - a).slice(0, 5);

    let idxs_d_1 = [];
    let idxs_d_2 = [];
    let idxs_d_3 = [];
    let idxs_d_4 = [];
    let idxs_d_5 = [];

    for (let i = 0; i < topValues_d_1.length; i++) {
        let idx_d = len_d_11.indexOf(topValues_d_1[i]);
        idxs_d_1.push(idx_d);
    }

    for (let i = 0; i < topValues_d_2.length; i++) {
        let idx_d = len_d_22.indexOf(topValues_d_2[i]);
        idxs_d_2.push(idx_d);
    }

    for (let i = 0; i < topValues_d_3.length; i++) {
        let idx_d = len_d_33.indexOf(topValues_d_3[i]);
        idxs_d_3.push(idx_d);
    }

    for (let i = 0; i < topValues_d_4.length; i++) {
        let idx_d = len_d_44.indexOf(topValues_d_4[i]);
        idxs_d_4.push(idx_d);
    }

    for (let i = 0; i < topValues_d_5.length; i++) {
        let idx_d = len_d_55.indexOf(topValues_d_5[i]);
        idxs_d_5.push(idx_d);
    }

    let final_result_d_1 = [];
    for (let i = 0; i < topValues_d_1.length; i++) {
        final_result_d_1.push(cluster1_dest_cluster_1[idxs_d_1[i]]);
    }

    let final_result_d_2 = [];
    for (let i = 0; i < topValues_d_2.length; i++) {
        final_result_d_2.push(cluster1_dest_cluster_2[idxs_d_2[i]]);
    }

    let final_result_d_3 = [];
    for (let i = 0; i < topValues_d_3.length; i++) {
        final_result_d_3.push(cluster1_dest_cluster_3[idxs_d_3[i]]);
    }

    let final_result_d_4 = [];
    for (let i = 0; i < topValues_d_4.length; i++) {
        final_result_d_4.push(cluster1_dest_cluster_4[idxs_d_4[i]]);
    }

    let final_result_d_5 = [];
    for (let i = 0; i < topValues_d_5.length; i++) {
        final_result_d_5.push(cluster1_dest_cluster_5[idxs_d_5[i]]);
    }

    let cluster1_d_1 = [];
    for (let i = 0; i < final_result_d_1[0]?.elements.length; i++) {
        cluster1_d_1.push(final_result_d_1[0].elements[i]);
    }

    let cluster1_d_2 = [];
    for (let i = 0; i < final_result_d_2[0]?.elements.length; i++) {
        cluster1_d_2.push(final_result_d_2[0].elements[i]);
    }

    let cluster1_d_3 = [];
    for (let i = 0; i < final_result_d_3[0]?.elements.length; i++) {
        cluster1_d_3.push(final_result_d_3[0].elements[i]);
    }

    let cluster1_d_4 = [];
    for (let i = 0; i < final_result_d_4[0]?.elements.length; i++) {
        cluster1_d_4.push(final_result_d_4[0].elements[i]);
    }

    let cluster1_d_5 = [];
    for (let i = 0; i < final_result_d_5[0]?.elements.length; i++) {
        cluster1_d_5.push(final_result_d_5[0].elements[i]);
    }

    let c1_ultimate_data = [];
    cluster1_d_1.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][1], element)) {
                c1_ultimate_data.push(data_c[i]);
            }
        }
    });

    let c2_ultimate_data = [];
    cluster1_d_2.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][1], element)) {
                c2_ultimate_data.push(data_c[i]);
            }
        }
    });

    let c3_ultimate_data = [];
    cluster1_d_3.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][1], element)) {
                c3_ultimate_data.push(data_c[i]);
            }
        }
    });

    let c4_ultimate_data = [];
    cluster1_d_4.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][1], element)) {
                c4_ultimate_data.push(data_c[i]);
            }
        }
    });

    let c5_ultimate_data = [];
    cluster1_d_5.forEach((element) => {
        for (let i = 0; i < data_c.length; i++) {
            if (equals(data_c[i][1], element)) {
                c5_ultimate_data.push(data_c[i]);
            }
        }
    });

    let plotting_data = []
    plotting_data.push(c1_ultimate_data);
    plotting_data.push(c2_ultimate_data);
    plotting_data.push(c3_ultimate_data);
    plotting_data.push(c4_ultimate_data);
    plotting_data.push(c5_ultimate_data);
    
    return plotting_data
}
