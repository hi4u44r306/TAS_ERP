import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import { Category, Cart } from "./pages/index";
// components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import { Provider } from 'react-redux';
import store from "./store/store";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import firebase from './pages/firebase';
import SearchPage from './pages/SearchPage/SearchPage';
import EditPage from './pages/EditPage/EditPage';
import QRScanner from './pages/QRScanner/QRScanner';

function App() {



  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const dbRef = firebase.database().ref();
      dbRef.child("Users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem("useruid", user.uid);
          localStorage.setItem('studentname', snapshot.val().studentname)
          localStorage.setItem('parentsname', snapshot.val().parentsname)
          localStorage.setItem('email', snapshot.val().email)
          localStorage.setItem('phonenumber', snapshot.val().phonenumber)
          localStorage.setItem('accountcreated', snapshot.val().accountcreated)
        } else {
          localStorage.setItem("useruid", '');
          localStorage.setItem('studentname', '')
          localStorage.setItem('parentsname', '')
          localStorage.setItem('email', '')
          localStorage.setItem('phonenumber', '')
          localStorage.setItem('accountcreated', '')
        }
      }).catch((error) => {
        console.error(error);
      });
      // 
    } else {
      localStorage.setItem("useruid", '');
      localStorage.setItem('studentname', '')
      localStorage.setItem('parentsname', '')
      localStorage.setItem('email', '')
      localStorage.setItem('phonenumber', '')
      localStorage.setItem('accountcreated', '')
    }
  });
  // const user = firebase.auth().currentUser;
  // const currentuser = localStorage.setItem('currentuser', user)
  const useruid = localStorage.getItem('useruid');

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          {/* <UserContext.Provider value={currentuser}> */}
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/category/:id" element={<Category />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/qrscanner" element={<QRScanner />} />
            <Route path={`/${useruid}/edit`} element={<EditPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="category/search" element={<SearchPage />} />
          </Routes>
          {/* </UserContext.Provider> */}
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
