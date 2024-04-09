import axios, { AxiosError } from 'axios';

export default function Form() {
  async function handleFormSubmission(event) {
    event.preventDefault();
    const { name, email, summary, description } = event.target;
    const params = {
      name: name.value,
      email: email.value,
      summary: summary.value,
      description: description.value,
    };
    console.log(params);
    try {
      console.log('inside axios');
      await axios.post(`api/tickets`, {
        ...params,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error((error as AxiosError).response);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className="form-container">
      <form action="" className="" onSubmit={handleFormSubmission}>
        <label htmlFor="nameInput">Name:</label>
        <input
          id="nameInput"
          type="text"
          name="name"
          placeholder="Jane Doe"
          maxLength={100}
          required
        />
        <label htmlFor="emailInput">Email:</label>
        <input
          type="email"
          name="email"
          id="emailInput"
          placeholder="name@domain.com"
          maxLength={320}
          required
        />
        <label htmlFor="summaryInput">Summary</label>
        <input
          type="text"
          name="summary"
          id="summaryInput"
          placeholder="Enter subject"
          maxLength={255}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="descriptionInput"
          name="description"
          placeholder="Enter description of issue"
          maxLength={500}
          required
        />
        <button>Submit Ticket</button>
      </form>
    </div>
  );
}
