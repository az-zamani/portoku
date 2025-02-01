<script setup>
useHead({
  title: 'Resume',
})
</script>

<template>
  <article class="resume active" data-page="resume">
    <header>
      <h2 class="h2 article-title">
        {{ $t('pageTitles.resume') }}
      </h2>
    </header>

    <section class="timeline">
      <ol class="timeline-list">
        <li class="timeline-item">
          <h4 class="h4 timeline-item-title">
            Kampusmadu
          </h4>
          <span>2021</span>
          <p class="timeline-item-desc">
            Jumapolo, Karanganyar
          </p>
          <p class="timeline-text">
            Graphic Design
          </p>
        </li>
        
        <!-- <li class="timeline-item">
          <h4 class="h4 timeline-item-title">
            Company
          </h4>
          <span>From — Until</span>
          <p class="timeline-item-desc">
            Location
          </p>
          <p class="timeline-text">
            Position
          </p>
        </li> -->
      </ol>
    </section>

    <section class="skill">
      <ul class="skills-list content-card">
        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">
              Web Development
            </h5>
            <data value="40"></data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 100%;" />
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">
              Graphic Design
            </h5>
            <data value="40"></data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 100%;" />
          </div>
        </li>

        <li class="skills-item">
          <div class="title-wrapper">
            <h5 class="h5">
              English
            </h5>
            <data value="40"></data>
          </div>

          <div class="skill-progress-bg">
            <div class="skill-progress-fill" style="width: 100%;" />
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>
