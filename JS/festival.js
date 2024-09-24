//api 모듈화 https://frogand.tistory.com/207
//https://velog.io/@rks852/open-API-%EB%A1%9C-%ED%95%84%EC%9A%94%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EA%B3%B5%ED%95%98%EA%B8%B0-Node.js-XML-JSON-Postman


/*요청 데이터 API 주소 설정 */ 
var api_type = 'searchFestival1';

/*한국 관광공사 API 필수 파라미터*/
var serviceKey = 'ZhtsUt4Ys4qGfZI5%2FCZlZkYc%2B1SUIGFWvRvDB%2B9OdUvnjWEU1EXclqwEuGsloJ3l74GAEK73h137%2BZxxip8H5Q%3D%3D';
var MobileApp = 'AppTest';
var MobileOS = 'ETC';
var _type = 'json';


/* 날짜 셋팅 */
var today = new Date();
var year = today.getFullYear().toString();
var month = (1+today.getMonth()).toString();
month = (month.length == 1)? month.padStart(2,"0") : month;
var day = today.getDate().toString();


/*행사 리스트 API 요청 파라미터*/

var numOfRows = 300;
var listYN = 'Y';
var pageNo = '1';
var arrange = 'A';
var eventStartDate = year+month+day; //필수

//eventStartDate ='20240901';
//console.log(eventStartDate);

var url = `https://apis.data.go.kr/B551011/KorService1/${api_type}?serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}
            &eventStartDate=${eventStartDate}&numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}`;


//개행문자가 섞여 호출이 제대로 안되어 개행문자 제거
url = url.replace(/\s*/g,"");
url = url.replace(/(\r\n\t|\n|\r\t)/gm,"");

console.log(url);


/*행사 API요청*/

    fetch(url)
    .then(res => res.json())
    .then(data => {
        var result = data.response.body.items.item;
       
        //원하는 행사 코드, 상시 행사 날짜 필터링
        let fastivalCode = ["A02070100","A0207200","A02080100","A02080200","A02080500","A02081300","A02080600"];
        result = result.filter((data)=> (fastivalCode.includes(data["cat3"])||data["cat1"]!= undefined )&& ( "20240901" < data.eventstartdate) );
        
        //이벤트 시작기간으로 오름차순 정렬
        result = result.sort((a, b)=> a.eventstartdate - b.eventstartdate);

        //HTML 리스트 요소 생성
        Eventlist(result);

        //로컬스토리지에 저장해야하는 달력에 표시할 데이터 로직 추가필요
        /* 담아야하는 형식
             {
                    title:'화성행궁 야간개방',
                    start:'2024-05-03',
                    end:'2024-10-27'
                }

        */
        

        
    })
    .catch((error)=>
        console.log(error)); 





//fetchDataForDate(startDate);


function Eventlist(result){
    var ul_set = document.querySelector(".list");
    ul_set.innerHTML = '';

    for(var i=0;  i < result.length; i++){
        
        var list_set = document.createElement("li");
        var p_set_Sd = document.createElement("p");
        var p_set_Ed = document.createElement("p");
        var p_set_Ti = document.createElement("p");
        
        p_set_Sd.append(result[i].eventstartdate.replace(/\s*/g,"")+" ~ "+result[i].eventenddate.replace(/\s*/g,""));
        p_set_Ed.append(result[i].addr1.split(/\s+/g).slice(0,2).join(' '));
        p_set_Ti.append(result[i].title);


        list_set.appendChild(p_set_Sd);
        list_set.appendChild(p_set_Ed);
        list_set.appendChild(p_set_Ti);

        ul_set.appendChild(list_set);
        
    }


}

 


