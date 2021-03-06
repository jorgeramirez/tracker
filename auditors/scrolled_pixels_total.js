(function () {
  var AuditorScrolledPixelsTotal = {
    scrolled_pixels_total_h: 0,
    previous_position_h: 0,
    scrolled_pixels_total_v: 0,
    previous_position_v: 0,
    setup: function () {
      this.previous_position_h = $(rootElementClass).scrollLeft() || 0;
      this.previous_position_v = $(rootElementClass).scrollTop() || 0;
    },
    log_scroll_event: function () {
      // horizontal
      var current_position_h = $(rootElementClass).scrollLeft();
      if (current_position_h != this.previous_position_h) {
        var raw_amount_h = current_position_h - this.previous_position_h;
        var amount_h = Math.abs(raw_amount_h);
        this.scrolled_pixels_total_h += amount_h;
        this.previous_position_h = current_position_h;
      }

      // vertical
      var current_position_v = $(rootElementClass).scrollTop();
      if (current_position_v != this.previous_position_v) {
        var raw_amount_v = current_position_v - this.previous_position_v;
        var amount_v = Math.abs(raw_amount_v);
        this.scrolled_pixels_total_v += amount_v;
        this.previous_position_v = current_position_v;
      }
    },
    submit_callable: function () {
      return {
        horizontal: this.scrolled_pixels_total_h,
        vertical: this.scrolled_pixels_total_v,
      };
    },
  };

  var auditor_scrolled_pixels_total = Object.create(AuditorScrolledPixelsTotal);
  auditor_scrolled_pixels_total.setup();

  $(rootElementClass).scroll(
    _.debounce(function (e) {
      auditor_scrolled_pixels_total.log_scroll_event.bind(
        auditor_scrolled_pixels_total
      )();
    }, 250)
  );

  window.auditor.register_auditor(
    'scrolled_pixels_total',
    auditor_scrolled_pixels_total.submit_callable.bind(
      auditor_scrolled_pixels_total
    )
  );
})();
