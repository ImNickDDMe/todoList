<script>
  import 'carbon-components-svelte/css/white.css'
  import { 
    Content,
    Grid,
    Row,
    Column,
    ContentSwitcher,
    Switch
  } from 'carbon-components-svelte'
  import AddTodo from './lib/AddTodo.svelte'
  import Todos from './lib/Todos.svelte'
  import Header from './lib/Header.svelte'
  import DeleteUser from './lib/DeleteUser.svelte'
  import { 
    selectedIndex, 
    ongoingTodos, 
    completedTodos 
  } from './stores'
  import {
    completedTodosRef,
    ongoingTodosRef,
    auth
  } from './firebaseConfig'
  import { user } from './stores'
  import { 
    onSnapshot,
    query,
    where
  } from 'firebase/firestore'
  import { onAuthStateChanged } from 'firebase/auth'

  onAuthStateChanged(auth, currentUser => {
    if (currentUser) {
      $user = currentUser

      const firstQuery = query(ongoingTodosRef, where('createdBy', '==', $user.uid))
      const firstUnsubscribe = onSnapshot(firstQuery, querySnapshot => {
        $ongoingTodos = []
        querySnapshot.forEach(doc => {
          $ongoingTodos = [...$ongoingTodos, {
            id: doc.id,
            ...doc.data()
          }]
        })
      })

      const secondQuery = query(completedTodosRef, where('createdBy', '==', $user.uid))
      const secondUnsubscribe = onSnapshot(secondQuery, querySnapshot => {
        $completedTodos = []
        querySnapshot.forEach(doc => {
          $completedTodos = [...$completedTodos, {
            id: doc.id,
            ...doc.data()
          }]
        })
      })
    }

    $user = null
  })
</script>

<Header />

<Content>
  {#if $user == null}
    <Grid fullWidth padding>
      <Row>
        <Column>
          <h1>You should be logged in first.</h1>
        </Column>
      </Row>
    </Grid>
  {:else}
    <Grid fullWidth padding>
      <Row>
        <Column>
          <h1>To-do List</h1>
        </Column>
      </Row>
      <Row>
        <Column>
          <ContentSwitcher bind:selectedIndex={$selectedIndex}>
            <Switch text="Ongoing" />
            <Switch text="Completed" />
          </ContentSwitcher>
        </Column>
      </Row>
      <Row>
        <Column>
          <Todos />
        </Column>
      </Row>
    </Grid>
    <AddTodo />
    <DeleteUser />
  {/if}
</Content>