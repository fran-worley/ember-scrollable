import Ember from 'ember';
import { test } from 'ember-qunit';
import '../../helpers/define-fixture';
import testHelper from '../../test-helper';

const unusedAdvisor = {
  id: 1,
  advisorName: 'Johnny Advisor'
};

QUnit.module("Unused Advisors Side Panel", {
  beforeEach: function() {
    testHelper.beforeEach.apply(this, arguments);

    Timecop.install();
    Timecop.freeze(moment('2015-02-18T10:30:00.000+00:00'));

    defineFixture('GET', '/unused_advisors', { response: {
      "unused_advisors": [
        {
          "id": 1,
          "name": unusedAdvisor.advisorName,
          "terms_sent_at": '2015-02-18T10:00:00.000+00:00',
          "project_id": 32522,
          "advisor_id": 10
        }
      ],

      "projects": [
        {
          "id": 32522,
          "name": "Project Name",
          "codename": "Internal Project title"
        }
      ],

      "advisors": [
        {
          "id": 10,
          "avatar_url": 'http://avatar-url.com',
          "name": unusedAdvisor.advisorName,
          "time_zone": null,
          "emails": [],
          "job_title": 'Boss',
          "company_name": 'Life, Inc.',
          "phone_numbers": [],
          "phones": []
        }
      ]
    }});
  },

  afterEach: function() {
    testHelper.afterEach.apply(this, arguments);
    Timecop.uninstall();
  }
});

test("Remove unused advisor from side panel", function(assert) {
  visit('/dashboard');

  andThen(function() {
    assert.equal(find('.unused-advisors article').length, 1);
  });

  defineFixture('DELETE', '/unused_advisors/1');
  click('.unused-advisors article:first');
  click("button:contains('Remove Advisor')");
  click("button:contains('Yes, Remove Advisor')");

  andThen(function() {
    assert.equal(find('.unused-advisors article').length, 0);

    var message = $('.messenger .messenger-message-inner').first().text().trim();
    assert.equal(message, `The advisor ${unusedAdvisor.advisorName} was removed from the list.`);
  });
});