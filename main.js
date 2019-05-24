let nameArr = [];
document.querySelector('button').addEventListener('click', function() {
    document.querySelector('[type="file"]').click();
})

document.querySelector('[type="file"]').addEventListener("change", function(e) {
    document.querySelector('.load').classList.add('activ');
    let arrAll = [],
        n0,
        n1,
        n00,
        n01,
        n11,
        n10,
        file = this.files[0],
        reader = new FileReader();
    
    reader.readAsText(file);
    reader.onload = function () {
        arrAll = reader.result.split('\r\n').join('');
        
        
        n0 = arrAll.match(/0/g).length-1;
        n1 = arrAll.match(/1/g).length-1;
        let sum1 = n0+n1;
        document.querySelector('.n0').value = n0;
        document.querySelector('.n1').value = n1;
        document.querySelector('.n0_per').value = (n0/sum1*100).toFixed(2) + ' %';
        document.querySelector('.n1_per').value = (n1/sum1*100).toFixed(2) + ' %';
        
        n00 = arrAll.match(/00/g).length-1;
        n01 = arrAll.match(/01/g).length-1;
        n11 = arrAll.match(/11/g).length-1;
        n10 = arrAll.match(/10/g).length-1;
        let sum2 = n00 + n01 + n11 + n10;
        document.querySelector('.n00').value = n00;
        document.querySelector('.n01').value = n01;
        document.querySelector('.n11').value = n11;
        document.querySelector('.n10').value = n10; 
        document.querySelector('.n00_per').value = (n00/sum2*100).toFixed(2) + ' %';
        document.querySelector('.n01_per').value = (n01/sum2*100).toFixed(2) + ' %';
        document.querySelector('.n11_per').value = (n11/sum2*100).toFixed(2) + ' %';
        document.querySelector('.n10_per').value = (n10/sum2*100).toFixed(2) + ' %'; 
        
        let sumArr = 0;
        nameArr.forEach(function(item_sum) {
            let reg = new RegExp(item_sum, 'g');
            sumArr += arrAll.match(reg).length-1;
        });
        
        nameArr.forEach(function(item, i, arr) {
            let reg = new RegExp(item, 'g');
            let num = arrAll.match(reg).length-1;
            document.querySelector(`.n${item}`).value = num;
            document.querySelector(`.n${item}_per`).value = (num/sumArr*100).toFixed(2) + ' %';
        });
        document.querySelector('.load').classList.remove('activ');
    }
});
for (let x = 0; x <= 1; x++) {
    for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
            let arr = [];
            arr.push(x, y, z);
            nameArr.push(arr.join(''));
        }
    }
}
nameArr.forEach(function(item, i, arr) {
    let out = '';
    out += `<input class="n${item}" type="text" readonly>
    `;
    document.querySelector('.wrap3').innerHTML += out;
    if (i == arr.length-1) {
        out = '<div class="per"></div>';
        document.querySelector('.wrap3').innerHTML += out;
        nameArr.forEach(function(item, i, arr) {
            let out = '';
            out += `<input class="n${item}_per" type="text" readonly>
            `;
            document.querySelector('.per').innerHTML += out;
        });
    }
    
})
