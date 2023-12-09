import {Switch, Route} from 'react-router-dom'
import Home from './component/Home'
import CourseItemDetail from './component/CourseItemDetail'
import NotFound from './component/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetail} />
    <Route exact path="/not-found" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)

export default App
