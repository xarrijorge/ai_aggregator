<template>
  <div>
    <!-- Navigation Bar -->
    <header class="navbar">
      <div class="container">
        <div class="logo">
          <h1>Nuxt Article Aggregator</h1>
        </div>
        <nav>
          <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/round-ups">Round Ups</a></li>
          </ul>
        </nav>
        <div class="actions">
          <input type="text" placeholder="Search..." />
          <select>
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>
      </div>
    </header>
    <NuxtPage />
  </div>
</template>

<style scoped>
.navbar {
  background-color: #1a1a1a;
  color: white;
  padding: 10px 20px;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
}

.nav-links li a {
  text-decoration: none;
  color: white;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions input {
  padding: 5px;
  border-radius: 4px;
  border: none;
}

.actions select {
  padding: 5px;
  border-radius: 4px;
  border: none;
}
</style>