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
import { rtdb } from './pages/firebase';
import SearchPage from './pages/SearchPage/SearchPage';
import EditPage from './pages/EditPage/EditPage';
import QRScanner from './pages/QRScanner/QRScanner';
import PaymentRecord from './pages/PaymentRecord/PaymentRecord';
import QRBatchGenerator from './pages/QRBatchGenerator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { get, ref } from 'firebase/database';

function App() {

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(rtdb, `Users/${user.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            localStorage.setItem("useruid", user.uid);
            localStorage.setItem('studentname', data.studentname || '');
            localStorage.setItem('parentsname', data.parentsname || '');
            localStorage.setItem('email', data.email || '');
            localStorage.setItem('phonenumber', data.phonenumber || '');
            localStorage.setItem('accountcreated', data.accountcreated || '');
          }
        }).catch(console.error);
      } else {
        ["useruid", "studentname", "parentsname", "email", "phonenumber", "accountcreated"].forEach(key => {
          localStorage.setItem(key, '');
        });
      }
    });

    return () => unsubscribe(); // 清除監聽
  }, []);



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
            <Route path="/qrcodegenerator" element={<QRBatchGenerator />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/qrscanner" element={<QRScanner />} />
            <Route path="/payrecord" element={<PaymentRecord />} />
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
