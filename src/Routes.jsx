import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Home from './views/Home';
import UserList from './views/UserList';
import UserDetail from './views/UserDetail';
import UserProfile from './views/Profile';
import UserEdit from './views/UserEdit';
import UserDelete from './views/UserDelete';
import NotFound from './views/NotFound';
import BookList from './views/BookList';
import BookDetail from './views/BookDetail';
import BookEdit from './views/BookEdit';
import BookDelete from './views/BookDelete';
import Login from './views/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import LikesNew from './components/LikesNew';
import ReviewDetail from './views/ReviewDetail';
import ReviewDelete from './views/ReviewDelete';
// import ReviewEdit from './views/ReviewEdit';
import BookNew from './components/BookNew';
import ReviewNew from './components/ReviewNew';
import NewLike from './components/NewLike';
import NewReport from './components/NewReport';
import ReviewEdit2 from './views/ReviewEdit';
import UserReviews from './views/UserReviews';
import Register from './views/Register';
import AuthContextProvider from './contexts/AuthContext';

export default function Routes() {
  return (
    <AuthContextProvider>
      <NavBar />
      <Switch>
        <Route exact path="/" component={BookList} />
        <Route exact path="/users" component={UserList} />
        <Route exact path="/users/me" component={UserProfile} />
        <Route exact path="/users/:id" component={UserDetail} />
        <Route exact path="/users/:id/reviews" component={UserReviews} />
        <Route exact path="/users/:id/edit" component={UserEdit} />
        <Route exact path="/users/:id/delete" component={UserDelete} />
        <Route exact path="/books" component={BookList} />
        <Route exact path="/books/:id" component={BookDetail} />
        <Route exact path="/books/:id/edit" component={BookEdit} />
        <Route exact path="/books/:id/delete" component={BookDelete} />
        <Route exact path="/newbook" component={BookNew} />
        <Route exact path="/books/:id/newreview" component={ReviewNew} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/books/:bookId/reviews/:reviewId" component={ReviewDetail} />
        <Route exact path="/books/:bookId/reviews/:reviewId/delete" component={ReviewDelete} />
        {/* <Route exact path="/books/:bookId/reviews/:reviewId/likes" component={LikesNew} /> */}
        <Route exact path="/books/:bookId/reviews/:reviewId/like" component={NewLike} />
        <Route exact path="/books/:bookId/reviews/:reviewId/report" component={NewReport} />
        <Route exact path="/books/:bookId/reviews/:reviewId/edit" component={ReviewEdit2} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </AuthContextProvider>
  );
}
