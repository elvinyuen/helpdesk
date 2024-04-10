import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Input from './Input';

export default function TicketSubmissionForm() {
  async function handleFormSubmission(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const summary = form.elements.namedItem('summary') as HTMLInputElement;
    const description = form.elements.namedItem(
      'description'
    ) as HTMLInputElement;

    const params = {
      name: name.value,
      email: email.value,
      summary: summary.value,
      description: description.value,
    };

    try {
      await axios.post(`api/tickets`, {
        ...params,
      });
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error((error as AxiosError).response);
      } else {
        console.error(error);
      }
    }
    return false;
  }

  return (
    <div className="form-container">
      <form className="flex flex-col" onSubmit={handleFormSubmission}>
        <Input
          label="Name: "
          id="name"
          type="text"
          name="name"
          placeholder="Jane Doe"
          maxLength={100}
          required={true}
        />
        <Input
          label="Email: "
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          maxLength={320}
          required={true}
        />
        <Input
          label="Summary: "
          type="text"
          name="summary"
          id="summary"
          placeholder="How can we help? (255 characters max)"
          maxLength={255}
          required={true}
        />

        <Input
          label="Description: "
          type="textarea"
          id="description"
          name="description"
          placeholder="Tell us more about your issue (500 characters max)"
          maxLength={500}
          required={true}
        />
        <button
          className={`bg-green text-white text-center rounded-[100px] w-[300px] px-[30px] py-[16px] font-semibold [transition:transform_.2s] hover:scale-110 hover:bg-dark-green self-center`}
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
