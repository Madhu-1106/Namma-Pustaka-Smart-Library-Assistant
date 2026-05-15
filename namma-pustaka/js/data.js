// ── NAMMA-PUSTAKA DATA ────────────────────────────────────────────

const COLORS = ['#1D9E75','#534AB7','#D85A30','#185FA5','#BA7517','#993556','#639922','#D4537E'];
const EMOJIS = {
  Story:'📖', Science:'🔬', History:'🏛️', Nature:'🌿',
  Math:'📐', Art:'🎨', Health:'💊', Sports:'⚽'
};
const COVER_COLORS = [
  '#E1F5EE','#EEEDFE','#E6F1FB','#FAEEDA','#EAF3DE',
  '#FAECE7','#FBEAF0','#E0F2FE','#FDF4E7'
];

const SEED_BOOKS = [
  {id:1,  title:'Tenali Ramakrishna Stories', author:'Folk Tales',          category:'Story',   emoji:'📖', color:'#E1F5EE', status:'available', rating:4.5, pages:180,
    reviews:[
      {student:'Priya K',  class:'6A', text:'Very funny stories! Loved Tenali outwitting everyone.', rating:5, avatar:'#1D9E75'},
      {student:'Raju M',   class:'5B', text:'My favourite book this year.',                          rating:4, avatar:'#534AB7'}
    ]},
  {id:2,  title:'Chandamama Stories',          author:'Various Authors',    category:'Story',   emoji:'🌙', color:'#EEEDFE', status:'borrowed',  rating:4.2, pages:220,
    borrowedBy:'Anil S', borrowedDate:'2026-05-01', dueDate:'2026-05-15',
    reviews:[
      {student:'Meena R',  class:'7A', text:'Classic stories every child should read.',             rating:4, avatar:'#D85A30'}
    ]},
  {id:3,  title:'Human Body Science',          author:'Dr. R. Sharma',      category:'Science', emoji:'🔬', color:'#E6F1FB', status:'available', rating:4.7, pages:310,
    reviews:[
      {student:'Kiran T',  class:'8B', text:'Diagrams are very clear and helpful.',                 rating:5, avatar:'#185FA5'}
    ]},
  {id:4,  title:'Plants and Animals',          author:'NCERT',              category:'Nature',  emoji:'🌿', color:'#EAF3DE', status:'borrowed',  rating:4.0, pages:150,
    borrowedBy:'Sunita V', borrowedDate:'2026-04-20', dueDate:'2026-05-04',
    reviews:[]},
  {id:5,  title:'Maths Magic',                 author:'Prof. K. Rao',       category:'Math',    emoji:'📐', color:'#FAEEDA', status:'available', rating:4.3, pages:200,
    reviews:[
      {student:'Deepa L',  class:'7B', text:'Makes maths fun with puzzles!',                       rating:4, avatar:'#BA7517'}
    ]},
  {id:6,  title:'Indian History for Kids',     author:'Romila Thapar Jr.',  category:'History', emoji:'🏛️', color:'#FAECE7', status:'available', rating:4.6, pages:280,
    reviews:[
      {student:'Vijay N',  class:'8A', text:'Finally history that is interesting.',                 rating:5, avatar:'#993556'}
    ]},
  {id:7,  title:'Birbal ki Budhimata',         author:'Folk Tales',         category:'Story',   emoji:'👳', color:'#FBEAF0', status:'overdue',   rating:4.4, pages:160,
    borrowedBy:'Mohan P', borrowedDate:'2026-04-10', dueDate:'2026-04-24',
    reviews:[]},
  {id:8,  title:'Space Exploration',           author:'ISRO Publications',  category:'Science', emoji:'🚀', color:'#E6F1FB', status:'available', rating:4.8, pages:340,
    reviews:[
      {student:'Arjun B',  class:'9A', text:'Chandrayaan chapter is amazing!',                     rating:5, avatar:'#534AB7'}
    ]},
  {id:9,  title:'Karnataka Folk Art',          author:'Dept. of Culture',   category:'Art',     emoji:'🎨', color:'#EEEDFE', status:'available', rating:4.1, pages:190,
    reviews:[]},
  {id:10, title:'Yoga for Students',           author:'B.K.S. Iyengar',     category:'Health',  emoji:'🧘', color:'#E1F5EE', status:'borrowed',  rating:4.5, pages:240,
    borrowedBy:'Lakshmi T', borrowedDate:'2026-05-10', dueDate:'2026-05-24',
    reviews:[]},
  {id:11, title:'Cricket Champions',           author:'Suresh Kumar',       category:'Sports',  emoji:'⚽', color:'#EAF3DE', status:'available', rating:4.3, pages:170,
    reviews:[
      {student:'Rahul D',  class:'6B', text:'Loved the chapter on Sachin!',                       rating:5, avatar:'#1D9E75'}
    ]},
  {id:12, title:'Wonder of Numbers',           author:'Ian Stewart',        category:'Math',    emoji:'🔢', color:'#FAEEDA', status:'overdue',   rating:4.6, pages:260,
    borrowedBy:'Geeta S', borrowedDate:'2026-04-05', dueDate:'2026-04-19',
    reviews:[]},
  {id:13, title:'Akbar and Birbal',            author:'Amar Chitra Katha',  category:'History', emoji:'👑', color:'#FAEEDA', status:'available', rating:4.4, pages:145,
    reviews:[]},
  {id:14, title:'Science Experiments',         author:'Dr. APJ Abdul Kalam',category:'Science', emoji:'⚗️', color:'#E6F1FB', status:'available', rating:4.9, pages:290,
    reviews:[
      {student:'Ananya S', class:'9B', text:'Inspired me to become a scientist!',                  rating:5, avatar:'#639922'}
    ]},
];

const SEED_STUDENTS = [
  {id:'S001', name:'Priya Kumari',   class:'6A', pages:420, booksRead:3, avatar:'#1D9E75'},
  {id:'S002', name:'Arjun Bhat',     class:'9A', pages:380, booksRead:2, avatar:'#534AB7'},
  {id:'S003', name:'Meena Rao',      class:'7A', pages:310, booksRead:2, avatar:'#D85A30'},
  {id:'S004', name:'Kiran Teja',     class:'8B', pages:290, booksRead:1, avatar:'#185FA5'},
  {id:'S005', name:'Deepa Lakshmi', class:'7B',  pages:260, booksRead:2, avatar:'#BA7517'},
  {id:'S006', name:'Vijay Naik',     class:'8A', pages:240, booksRead:1, avatar:'#993556'},
  {id:'S007', name:'Rahul Dev',      class:'6B', pages:220, booksRead:1, avatar:'#639922'},
  {id:'S008', name:'Sunita Verma',   class:'5B', pages:180, booksRead:1, avatar:'#D4537E'},
  {id:'S009', name:'Ananya Singh',   class:'9B', pages:340, booksRead:2, avatar:'#185FA5'},
  {id:'S010', name:'Rohan Patil',    class:'5A', pages:160, booksRead:1, avatar:'#1D9E75'},
];

const SEED_HISTORY = [
  {bookId:3,  bookTitle:'Human Body Science', student:'Kiran T',   action:'returned', date:'2026-05-10', pages:310},
  {bookId:11, bookTitle:'Cricket Champions',  student:'Rahul D',   action:'returned', date:'2026-05-08', pages:170},
  {bookId:5,  bookTitle:'Maths Magic',        student:'Deepa L',   action:'returned', date:'2026-05-06', pages:200},
];
