//return array of path from start to end
// returns None if path is not found
//start:{x:1,y:1}
function aStar (idxArray,m,n,start,end){

    var startIdx = xy2idx(start.x,start.x)
    var endIdx = xy2idx(end.x,end.x)
    
    //Initialize
    var queue =  [endIdx];
    idxArray[endIdx].c=0;
    
    for (var i = 0;i<queue.length;++i){
        if(queue[i] == startIdx ){
            console.log('DONE')
            break;
        }
        var tempList = gen(idxArray,idxArray[queue[i]],queue[i],m,n);
        //console.log({a:queue[i],tempList,queue})
        //console.log(queue.length)    
        queue = queue.concat(tempList)
    }


}
function gen (idxArray,current,idx,m,n){
    var x = current.i;
    var y = current.j;
    var count = current.c+1;
    var maxIdx = (m*n)-1;
    
    var temp = [idx+n,idx-n] //Left, Down, Right, Up
    if((idx-1)>=0 && (idx-1)%n!=0){
        temp.push(idx-1)
    }

    if((idx+1)<=maxIdx && (idx+1)%n!=1){
        temp.push(idx+1)
    }

    temp.forEach((value,index,array)=>{
        if(value<0 || value>maxIdx){ //out of bounds
            delete array[index];
        }
        else if(idxArray[value].val != 1){ //inaccessible
            delete array[index];
        }
        else if(idxArray[value].c && idxArray[value].c <=count){ //why choose the longer path
            delete array[index];
        }
        else{
            //all good to add
            idxArray[value].parent = idx //change parent
            idxArray[value].c = count //change count
        }
    })
    return temp.filter((x)=>x); //remove empty elements
}

function xy2idx (x,y,m,n){
    return (x*n)+y;
}
