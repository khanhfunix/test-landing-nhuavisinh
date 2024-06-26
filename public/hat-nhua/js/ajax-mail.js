$(function () {
  // Get the form.
  var form = $("#appai-contact-form");

  // Get the messages div.
  var formMessages = $(".appai-form-send-message");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();
    //console.dir(formData);

    // Submit the form using AJAX.
    $.ajax({
      type: "GET",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $(".form-group input, .form-group textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Lỗi mạng, thông điệp chưa được gửi, vui lòng gọi: 0904.9898.32"
          );
        }
      });
  });
});
