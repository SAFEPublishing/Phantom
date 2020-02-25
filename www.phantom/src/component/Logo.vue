<template>
    <div class="logo">Phantom</div>
</template>

<style scoped lang="scss">
    .logo {
        position: relative;
        display: inline-block;
        font-size: 20px;
        font-weight: bold;

    &:before {
         position: absolute;
         display: inline-block;
         content: "Phantom";
         top: 3px;
         left: 3px;
         padding: 1px 9px;
         color: #fff;
         z-index: 2;
     }

    &:after {
         position: absolute;
         display: block;
         content: "";
         top: 0;
         left: 0;
         height: 35px;
         width: calc(100% + 24px);
         background: linear-gradient(145deg, #3ca6ce, #7a36c8, #c836a9);
         background-size: 400% 400%;
         animation: logoAnimation 4s ease-in-out infinite;
     }
    }

    @keyframes logoAnimation {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
    }
</style>