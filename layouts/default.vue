<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    <div
      id="sidebar"
      class="h-screen w-16 menu bg-white text-white px-4 flex items-center nunito static fixed shadow"
    >
      <ul class="list-reset">
        <li class="my-2 md:my-0">
          <a
            href="#"
            class="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400"
          >
            <i class="mdi mdi-home w-5 mr-3"></i
            ><span class="w-full inline-block pb-1 md:pb-0 text-sm">Home</span>
          </a>
        </li>
        <li class="my-2 md:my-0">
          <a
            href="#"
            class="block py-1 md:py-3 pl-1 align-middle text-gray-600 no-underline hover:text-indigo-400"
          >
            <i class="mdi mdi-gamepad w-5 mr-3 text-lg"></i
            ><span class="w-full inline-block pb-1 md:pb-0 text-sm">Game</span>
          </a>
        </li>
      </ul>
    </div>
    <div
      id="dash-content"
      class="bg-gray-200 py-6 lg:py-0 w-full flex flex-wrap content-start"
    >
      <Nuxt />
    </div>
  </div>
</template>

<style>
.nunito {
  font-family: 'Nunito', sans-serif;
}

.border-b-1 {
  border-bottom-width: 1px;
}

.border-l-1 {
  border-left-width: 1px;
}

.border-none:hover {
  border-style: none;
}

#sidebar {
  transition: ease-in-out all 0.3s;
  z-index: 9999;
}

#sidebar span {
  opacity: 0;
  position: absolute;
  transition: ease-in-out all 0.1s;
}

#sidebar:hover {
  width: 150px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  /* shadow-2xl */
}

#sidebar:hover span {
  opacity: 1;
}
</style>
