
const BASE_URL  = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=434189bc427d777c408c7653dd1dabe6';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY ;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=434189bc427d777c408c7653dd1dabe6&query="';
//const GENRE_MOVIE = 'https://api.themoviedb.org/3/genre/movie/list?api_key=434189bc427d777c408c7653dd1dabe6'

//Variabel untuk content 
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//Mengambil id tag
const tagEL = document.getElementById('tags');

//baru
//Variabel Panigination ,Yang mengambil dari Id html
const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')
//baru
//variabel page 
var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalpages = 100;


//array untuk Mengambil setiap Nama genre flim
const genres =[
   
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
  
  

];


//PROSES TAG GENRE MOVIE
//Menampung Semua Tag Genre Movie
var selectGenre =[]
//Parameter
setgenre();
function setgenre(){
    tagEL.innerHTML = '';
    //forloop Genre Movie
    genres.forEach(genre => {
        //Tambah Tag Genre Berdasarkan Variabel yang Menampung Data array (genres) 
    const t = document.createElement('div'); 
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText =genre.name;
         //jika tag di klik
        t.addEventListener('click', () => {
             //cek ,genre Movie nya 0 ga? pasti 0
            if(selectGenre.length == 0){
                //Jika 0 Maka Masukan/Tampilkan Movie Sesuai Dengan ID Genre
                selectGenre.push(genre.id);
            }else{  
                  //jika format nya tidak sama ,Maka samakan (includes) dengan Id Genre
                if(selectGenre.includes(genre.id)){
                    //Maka forloop semua Genre yang sesuai Id 
                    selectGenre.forEach((id,idx) => {
                        //berdasarkan
                        if(id == genre.id){
                            //splice Yaitu Menambahkan atau Menghapus elemen array
                            //artinya harus pilih salah satu dari Data Array (Tag Gender),Tidak 2 sekaligus
                            selectGenre.splice(idx , 1);
                        }
                    })
                }else{
                    //pilih(tambahkan)sesuai yang di klik
                    selectGenre.push(genre.id);
                }
                console.log(selectGenre)
                getMovies(API_URL + '&with_genres=' + encodeURI(selectGenre.join(',')))
                PilihanMovie()
                
            } 
        })
        //Untuk Menampilkan Tag Genre
        tagEL.append(t);

    });
}

//Genre Movie yang di pilih
function PilihanMovie(){
    //Untuk Mengembalikan Warna semula yang sudah di Klik
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag =>{
        tag.classList.remove('Pilihan');
    })
    //Function Clear Btn akan Muncul jika Genre Movie di klik
    ClearBtn()
    //Tag Menjadi Warna Merah sesuai yang di pilih
    if(selectGenre.length !=0){
        selectGenre.forEach(id =>{
            const Pilihantag = document.getElementById(id);
            Pilihantag.classList.add('Pilihan');
        })
    }
}

//Proses Clear Genre Movie
function ClearBtn(){
    let ClearBtn = document.getElementById('clear');
    if (ClearBtn){
        ClearBtn.classList.add('Pilihan')
    }else{
        let clear = document.createElement('div');
        clear.classList.add('tag','Pilihan');
        clear.id ='clear';
        clear.innerText = 'Clear X';
        clear.addEventListener('click',() =>{
            selectGenre=[];
            setgenre();
            getMovies(API_URL);

        })
        //Clear Tag Genre
        tags.append(clear)

    }
}


// Get initial movies
getMovies(API_URL);

    //Get Movie
async function getMovies(url) {
    //Page 1
    lastUrl = url;
    //mengambil data yang berupa respon json
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        //jika data Movie nya ada (Sesuai Genre)
        if(data.results.length != 0){
            //Tampilkan
            showMovies(data.results);
            //Dekralasi Panigation
            //data adalah semua Data Movie ,page Adalah Name Page
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalpages = data.total_pages;
            //Nomor Mundur (Previus Page)
            current.innerText = currentPage;
            //page 1
            if(currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled')
                //jika lebih dari 1(Page2-seterus), (Previus Page jangan disabled)
            }else if(currentPage >= totalpages){
                prev.classList.remove('disabled');
                next.classList.add('disabled')
            }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled')
            }
           
        }else{
            //Jika Tidak ada
            main.innerHTML= `<h1 class='no-result'style="color:black;">Tidak ada hasil yang ditemukan</h1>`
        }
     
    })
   
}
    //PROSES MENAMPILKAN MOVIE
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const {
            title,
            poster_path,
            vote_average,
            overview,
            release_date,
            id      
        } = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        // <img src="${ IMG_PATH + poster_path}" alt="${title}">
        // <img src="${poster_path? IMG_PATH + poster_path :'http://via.placeholder.com/1080x1580'}" alt="${title}">
        //untuk Memanipulasi Image yang tidak ada
        movieEl.innerHTML = `  
            <img src="${poster_path? IMG_PATH + poster_path :'http://via.placeholder.com/1080x1580'}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Description</h3>
          ${overview}
          <h3>Relase</h3>
          ${release_date}
            </br>
            </br>
            <button class="know-more" id="${id}">Thailer</button>
        </div>
        `
        main.appendChild(movieEl)
        //Memanggil Thailer Sesuai dengan Id Movie
        document.getElementById(id).addEventListener('click',()=>{
            console.log(id)
            openNav(movie)
        })
    })
}

/* Open when someone clicks on the span element */
const overlaycontent = document.getElementById('overlay-content');
function openNav(movie) {
    let id_movie = movie.id;
    fetch(BASE_URL + '/movie/' + id_movie + '/videos?' + API_KEY).then(res => res.json())
    .then (vidiosData =>{
        console.log(vidiosData);
        if(vidiosData){
            document.getElementById("myNav").style.width = "100%";
            if(vidiosData.results.length > 0){
                var embed = [];
                var dots = [];
                //mengambil elemen api dari setiap Movie 
                vidiosData.results.forEach((vidio ,idx ) => {
                let {name,key ,site} = vidio
                    if(site == 'YouTube'){
                        embed.push(`
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" 
                        title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; 
                        clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `)
                        dots.push(`
                        <span class ="dot">${idx + 1}</span>
                        `)
                    }
                })
                //Membuat nama movie di atas frime 
                var content = `
                <h1 class='no-result'>${movie.original_title}</h1>
                <br/>
             
                ${embed.join('')}

                <br/>
                <div class="dots">${dots.join('')}</div>
                `
                //Menampilkan Movie
                overlaycontent.innerHTML = content;
                //slide Active frime
                activeSlide=0;
                Showvidios();
            }else{
                overlaycontent.innerHTML = `<h1 class='no-result'>Thailer Movie Tidak ditemukan</h1>`
            }
        }
    })
    
  }
  
  //PROSES THAILER YOUTUBE
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  var activeSlide = 0;
  var Totalvidios = 0;
  function Showvidios(){
      let embedclass = document.querySelectorAll('.embed');
      let dots = document.querySelectorAll('.dot');
      Totalvidios = embedclass.length;
      embedclass.forEach((embedTag ,idx) => {
        if(activeSlide == idx){
            embedTag.classList.add('show')
            embedTag.classList.remove('hide')
          }else{
            embedTag.classList.add('hide')
            embedTag.classList.remove('show')
          }
      })
      dots.forEach((dot,indx) =>{
        if (activeSlide == indx){
            dot.classList.add('active')
        }else{
            dot.classList.remove('active')
        }
      }); 
  }

  const leftarrow = document.getElementById('left-arrow')
  const righttarrow = document.getElementById('right-arrow')

  leftarrow.addEventListener('click' ,()=>{
      if(activeSlide > 0 ){
          activeSlide --;
      }else{
    activeSlide = Totalvidios - 1;
      }
      Showvidios()
  })
  
  righttarrow.addEventListener('click' ,()=>{
    if(activeSlide < (Totalvidios - 1)  ){
        activeSlide ++;
    }else{
    activeSlide = 0;
    }
    Showvidios()
})


     // VALIDASI VOTE DI SETIAP VOTE MOVIE
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

    //PROSES PENCARIAN FLIM
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    //Clear Genre Movie
    selectGenre=[];
    setgenre();
    //Search All Movie
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})



//PROSES PAGINATION MOVIE

//Panggil Page Sesuai Dengan Api
function pageCall(page){
    //Metode split() membagi string menjadi larik substring.
    //sesuai dengan APi page
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if(key[0] != 'page'){
        let url = lastUrl + '&page='+page
        getMovies(url);
    }else{
        key[1] = page. toString();
        let a = key.join('=');
        queryParams[queryParams.length -1 ] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        getMovies(url);
    }
}

//klik Next 
next.addEventListener('click',() =>{
    if (nextPage <= totalpages){
        pageCall(nextPage);
    }
})

//klik Previous
prev.addEventListener('click',() =>{
    if (nextPage > 0){
        pageCall(prevPage);
    }
})





