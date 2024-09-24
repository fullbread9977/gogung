//api 모듈화 https://frogand.tistory.com/207
//https://velog.io/@rks852/open-API-%EB%A1%9C-%ED%95%84%EC%9A%94%ED%95%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B0%80%EA%B3%B5%ED%95%98%EA%B8%B0-Node.js-XML-JSON-Postman


/*요청 데이터 API 주소 설정 */ 
var api_type = 'areaBasedSyncList1';

/*한국 관광공사 API 필수 파라미터*/
var serviceKey = 'ZhtsUt4Ys4qGfZI5%2FCZlZkYc%2B1SUIGFWvRvDB%2B9OdUvnjWEU1EXclqwEuGsloJ3l74GAEK73h137%2BZxxip8H5Q%3D%3D';
var MobileApp = 'AppTest';
var MobileOS = 'ETC';
var _type = 'json';


/*고궁 전체 리스트 API 요청 파라미터*/
var showflag = 1;
var numOfRows = 100;
var listYN = 'Y';
var pageNo = '1';
var arrange = 'A';
var contentTypeId = 12;
var cat1 = 'A02';
var cat2 = 'A0201';
var cat3 = 'A02010100';
var areaCode = '0'; 

var url;

/*select 값 선택했는지 체크*/
function getDataFrom(){
    //event.html에서 선택한 value값 불러오기 (브라우저에서만 작동)
    var LocationCode = localStorage.getItem('selectValue');
    LocationCode = parseFloat(LocationCode); 
    
    //값 체크, 설정 안되어 있으면 전국 고궁 불러오기로 설정
    if(!LocationCode){
        Set_apipath('0'); 
        console.log('전체 또는 코드 선택안함 체크');
                   
    }else{
        Set_apipath(LocationCode);
        console.log('데이터 저장 불러오기:',LocationCode);
        }
    
        getAPI();
}
            
getDataFrom();


function Set_apipath(LocationCode){
  
    if(LocationCode === '0'){
        //전체 선택시, 지역 파라미터 제외한 API로 호출
            url = `https://apis.data.go.kr/B551011/KorService1/${api_type}?serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
            &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
            &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}`;
                console.log('전체 선택 체크');        
                
    }else{
        //특정 지역 선택 시, 지역코드 추가한 API로 호출
        url = `https://apis.data.go.kr/B551011/KorService1/${api_type}?serviceKey=${serviceKey}&MobileApp=${MobileApp}&MobileOS=${MobileOS}&_type=${_type}&showflag=${showflag}
                &numOfRows=${numOfRows}&listYN=${listYN}&pageNo=${pageNo}&arrange=${arrange}&contentTypeId=${contentTypeId}
                &cat1=${cat1}&cat2=${cat2}&cat3=${cat3}&areaCode=${LocationCode}`;
            console.log('지역코드 선택 체크');
               
               
    }

    //개행문자가 섞여 호출이 제대로 안되어 공백,개행문자 제거
    url = url.replace(/\s*/g,"");
    url = url.replace(/(\r\n\t|\n|\r\t)/gm,"");

    console.log('호출한 API',url);
    localStorage.removeItem('selectValue');
}

/*고궁 전체 지역 API요청*/
function getAPI() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        var result = data.response.body.items.item;
        if(data.response.body.totalCount > 0){
                /*리스트 요소 생성*/
                Create_LocationList(result);

        }else{
            var main_context = document.querySelector("#main_context_box");
            main_context.innerHTML = '';
            
            
            var in_span = document.createElement('span');
            in_span.textContent = "선택한 지역에서 고궁을 찾을 수 없습니다.";
            main_context.appendChild(in_span); 

        }

        
    })
    .catch((error)=> {
        console.log(error);
        var main_context = document.querySelector("#main_context_box");
        main_context.innerHTML = '';
        
        var in_span = document.createElement('span');
        in_span.textContent = "오류 입니다. 관리자에게 문의해주세요!";

        main_context.appendChild(in_span); 

    }); 

}


/*리스트 요소 생성*/
function Create_LocationList(result){
    var main_context = document.querySelector("#main_context_box");
    main_context.innerHTML = '';

    for(var i=0; i < result.length; i++){

        /*리스트 요소 생성, 리스트 4개씩 묶음, obj 20개 이상부터 none 태그로 리스트 숨김 */
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
}










