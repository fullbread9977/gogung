//api 모듈화 https://frogand.tistory.com/207
//https://velog.io/@rks852/open-API-%EB%A1%9C-%ED%95%84%EC%9A%94%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EA%B3%B5%ED%95%98%EA%B8%B0-Node.js-XML-JSON-Postman


/*API 요청 파라미터*/
let api_type = 'areaBasedSyncList1';
let serviceKey = 'ZhtsUt4Ys4qGfZI5%2FCZlZkYc%2B1SUIGFWvRvDB%2B9OdUvnjWEU1EXclqwEuGsloJ3l74GAEK73h137%2BZxxip8H5Q%3D%3D';
let MobileApp = 'AppTest';
let MobileOS = 'ETC';
let _type = 'json';
let showflag = 1;
let numOfRows = 100;
let listYN = 'Y';
let pageNo = '1';
let arrange = 'A';
let contentTypeId = 12;
let cat1 = 'A02';
let cat2 = 'A0201';
let cat3 = 'A02010100';
let url = `http://apis.data.go.kr/B551011/KorService1/${api_type}?serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
    &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
    &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}`;


//개행문자가 섞여 호출이 제대로 안되어 개행문자 제거
url = url.replace(/(\r\n\t|\n|\r\t)/gm,"");


/*
serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
    &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
    &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}
*/
//console.log(url);



/* 선택한 지역으로 API 설정 */



//var select = select_location.options[select_location.selectedIndex].value;




/*API요청*/
fetch(url)
    .then(res => res.json())
    .then(data => {
        var result = data.response.body.items.item;

        /*리스트 요소 생성*/

        var main_context = document.querySelector("#main_context_box");


        for(var i=0; i < result.length; i++){

            /*리스트 요소 생성*/
            if(i%4==0){
            var ul_list = document.createElement("ul");
            ul_list.setAttribute("class", `main_context ${(i>20)? "none": "" }`);
            }

            var li_list = document.createElement("li");
            li_list.setAttribute("class","location_li");

            var a_link = document.createElement("a");
            a_link.setAttribute("class","context_link"); 
            a_link.setAttribute("href", "#"); //나중에 링크 삽입


            var img_ele = document.createElement("img");
            img_ele.setAttribute("class","location_img");

            //이미지 데이터 여부판단, 없으면 class에 non-image 추가
            if(result[i].firstimage){

                img_ele.src = result[i].firstimage;

            }else{

                img_ele.classList.add("non-image");
            }
           

            var div_ele = document.createElement("div");
            div_ele.setAttribute("class","location_context_box");

            var span_ele = document.createElement("span");
            span_ele.setAttribute("class","location_context");
            span_ele.textContent =  (result[i].title)? result[i].title : "non-title";
         

            
            div_ele.appendChild(span_ele);
            a_link.appendChild(img_ele);
            a_link.appendChild(div_ele);
            li_list.appendChild(a_link);
            ul_list.appendChild(li_list);
            main_context.appendChild(ul_list);

            
        }
        
        
        
    })
    .catch((error)=>console.log(error)); 








