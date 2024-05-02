## Zod

[https://zod.dev/](https://zod.dev/)

It's very helpful to validate schemas on API and server actions.

Install zod

```bash
npm add zod
```

Create schema

```bash
import { z } from 'zod'

const feedbackSchema = z.object({
  name: z.string().min(5),
  subject: z.string(),
  comments: z.string().optional(),
})
```

Custom messages

```bash
import { z } from 'zod'

const feedbackSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name should be string',
      required_error: 'Name is required',
    })
    .min(5, {
      message: 'Name is required at least 5 characters',
    }),
  subject: z.string(),
  comments: z.string().optional(),
})
```

It's very similar to Typescript to work with properties, please take a look at [zod Objects](https://zod.dev/?id=objects)

Expect exact key names with [.strict](https://zod.dev/?id=strict)

Example of using a form to submit to an internal API.
[/api/feedback/route.ts](./src/app/api/feedback/route.ts)
