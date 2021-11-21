<template>
  <div class="next-steps">
    <h2 class="my-5 text-center">What can I do next?</h2>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal"  data-bs-backdrop="static"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Test popup box
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>


    <div class="row">
      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/connections">
            Configure other identity providers
          </a>
        </h6>
        <p>Auth0 supports social providers as Facebook, Twitter, Instagram and 100+, Enterprise providers as Microsoft Office 365, Google Apps, Azure, and more. You can also use any OAuth2 Authorization Server.</p>
      </div>

      <div class="col-md"></div>

      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/multifactor-authentication">
            Enable Multifactor Authentication
          </a>
        </h6>
        <p>Add an extra layer of security by enabling Multi-factor Authentication, requiring your users to provide more than one piece of identifying information. Push notifications, authenticator apps, SMS, and DUO Security are supported.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/anomaly-detection">
            Anomaly Detection
          </a>
        </h6>
        <p>Auth0 can detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts.</p>
      </div>

      <div class="col-md"></div>

      <div class="col-md-5 mb-4">
        <h6 class="mb-3">
          <a href="https://auth0.com/docs/rules">
            Learn About Rules
          </a>
        </h6>
        <p>Rules are JavaScript functions that execute when a user authenticates to your application. They run once the authentication process is complete, and you can use them to customize and extend Auth0's capabilities.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
 name: "HomeContent"
})
</script>